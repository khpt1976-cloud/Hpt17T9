/**
 * Grid Layout Calculator for A4 Construction Report Pages
 * Tính toán kích thước khung ảnh dựa trên input người dùng và constraints khổ A4
 */

export interface GridCalculationInput {
  imagesPerPage: number    // Số ảnh muốn chèn
  imagesPerRow: number     // Số khung theo chiều ngang
}

export interface GridCalculationResult {
  // Kích thước khung tính được
  cellWidth: number        // mm
  cellHeight: number       // mm
  
  // Thông tin layout
  rows: number            // Số hàng thực tế
  cols: number            // Số cột thực tế
  
  // Validation results
  isValid: boolean        // Có thể chèn được không
  warnings: string[]      // Các cảnh báo
  errors: string[]        // Các lỗi
  
  // Grid dimensions
  totalGridWidth: number  // mm - Tổng chiều rộng grid
  totalGridHeight: number // mm - Tổng chiều cao grid
}

// Constants - Khổ A4 và constraints
const A4_CONSTANTS = {
  // A4 paper size
  PAPER_WIDTH: 210,       // mm
  PAPER_HEIGHT: 297,      // mm
  
  // Available area for images (4/5 of page height, with margins)
  AVAILABLE_WIDTH: 180,   // mm (210 - 30 margin) - conservative
  AVAILABLE_HEIGHT: 200,  // mm (safe area for images) - conservative
  
  // Header area (1/5 of page height)
  HEADER_HEIGHT: 59,      // mm (297 * 1/5)
  
  // Grid constraints
  MAX_ROWS: 5,
  MAX_COLS: 4,
  MAX_IMAGES_PER_PAGE: 20,
  
  // Size constraints
  MIN_CELL_SIZE: 15,      // mm - Minimum readable size
  MAX_CELL_SIZE: 60,      // mm - Maximum practical size
  GAP_SIZE: 5,            // mm - Gap between cells
  
  // Margins
  MARGIN: 10              // mm
}

/**
 * Tính toán layout grid dựa trên input người dùng
 */
export function calculateGridLayout(input: GridCalculationInput): GridCalculationResult {
  const { imagesPerPage, imagesPerRow } = input
  
  // Initialize result
  const result: GridCalculationResult = {
    cellWidth: 0,
    cellHeight: 0,
    rows: 0,
    cols: imagesPerRow,
    isValid: false,
    warnings: [],
    errors: [],
    totalGridWidth: 0,
    totalGridHeight: 0
  }
  
  // Validation 1: Basic input validation
  if (imagesPerPage <= 0 || imagesPerRow <= 0) {
    result.errors.push("Số ảnh và số khung/hàng phải lớn hơn 0")
    return result
  }
  
  // Validation 2: Maximum constraints
  if (imagesPerPage > A4_CONSTANTS.MAX_IMAGES_PER_PAGE) {
    result.errors.push(`Tối đa ${A4_CONSTANTS.MAX_IMAGES_PER_PAGE} ảnh trên 1 trang`)
    return result
  }
  
  if (imagesPerRow > A4_CONSTANTS.MAX_COLS) {
    result.errors.push(`Tối đa ${A4_CONSTANTS.MAX_COLS} khung theo chiều ngang`)
    return result
  }
  
  // Calculate rows
  const rows = Math.ceil(imagesPerPage / imagesPerRow)
  result.rows = rows
  
  // Validation 3: Maximum rows
  if (rows > A4_CONSTANTS.MAX_ROWS) {
    result.errors.push(`Với ${imagesPerRow} khung/hàng và ${imagesPerPage} ảnh sẽ tạo ${rows} hàng. Tối đa chỉ được ${A4_CONSTANTS.MAX_ROWS} hàng.`)
    return result
  }
  
  // Calculate available space for cells (minus gaps)
  const totalGapWidth = (imagesPerRow - 1) * A4_CONSTANTS.GAP_SIZE
  const totalGapHeight = (rows - 1) * A4_CONSTANTS.GAP_SIZE
  
  const availableWidthForCells = A4_CONSTANTS.AVAILABLE_WIDTH - totalGapWidth
  const availableHeightForCells = A4_CONSTANTS.AVAILABLE_HEIGHT - totalGapHeight
  
  // Calculate cell dimensions - ưu tiên fit trong available area
  const calculatedCellWidth = Math.floor(availableWidthForCells / imagesPerRow)
  const calculatedCellHeight = Math.floor(availableHeightForCells / rows)
  
  // Apply size constraints - PHẢI fit trong available area
  let finalCellWidth = Math.max(A4_CONSTANTS.MIN_CELL_SIZE, calculatedCellWidth)
  let finalCellHeight = Math.max(A4_CONSTANTS.MIN_CELL_SIZE, calculatedCellHeight)
  
  // Đảm bảo không vượt quá available area (quan trọng nhất)
  const maxAllowedWidth = Math.floor(availableWidthForCells / imagesPerRow)
  const maxAllowedHeight = Math.floor(availableHeightForCells / rows)
  
  finalCellWidth = Math.min(finalCellWidth, maxAllowedWidth)
  finalCellHeight = Math.min(finalCellHeight, maxAllowedHeight)
  
  // Chỉ sau đó mới áp dụng MAX_CELL_SIZE
  finalCellWidth = Math.min(A4_CONSTANTS.MAX_CELL_SIZE, finalCellWidth)
  finalCellHeight = Math.min(A4_CONSTANTS.MAX_CELL_SIZE, finalCellHeight)
  
  // Check if cells are too small
  if (calculatedCellWidth < A4_CONSTANTS.MIN_CELL_SIZE) {
    result.warnings.push(`Khung ảnh sẽ rất nhỏ (${calculatedCellWidth}mm). Khuyến nghị giảm số khung/hàng.`)
  }
  
  if (calculatedCellHeight < A4_CONSTANTS.MIN_CELL_SIZE) {
    result.warnings.push(`Khung ảnh sẽ rất thấp (${calculatedCellHeight}mm). Khuyến nghị giảm số ảnh.`)
  }
  
  // Calculate total grid dimensions
  const totalGridWidth = (finalCellWidth * imagesPerRow) + totalGapWidth
  const totalGridHeight = (finalCellHeight * rows) + totalGapHeight
  
  // Check if grid fits in available area
  if (totalGridWidth > A4_CONSTANTS.AVAILABLE_WIDTH) {
    result.errors.push(`Grid quá rộng (${totalGridWidth}mm > ${A4_CONSTANTS.AVAILABLE_WIDTH}mm)`)
    return result
  }
  
  if (totalGridHeight > A4_CONSTANTS.AVAILABLE_HEIGHT) {
    result.errors.push(`Grid quá cao (${totalGridHeight}mm > ${A4_CONSTANTS.AVAILABLE_HEIGHT}mm)`)
    return result
  }
  
  // Success - populate result
  result.cellWidth = finalCellWidth
  result.cellHeight = finalCellHeight
  result.totalGridWidth = totalGridWidth
  result.totalGridHeight = totalGridHeight
  result.isValid = true
  
  // Debug console
  console.log(`🧮 Grid calculation: ${imagesPerPage} ảnh, ${imagesPerRow} cột → ${rows} hàng → ${finalCellWidth}×${finalCellHeight}mm → Total: ${totalGridWidth}×${totalGridHeight}mm`)
  
  // Add informational warnings
  if (finalCellWidth < 30 || finalCellHeight < 30) {
    result.warnings.push("Khung ảnh khá nhỏ, có thể khó nhìn khi in.")
  }
  
  if (rows === 1 && imagesPerPage < imagesPerRow) {
    result.warnings.push(`Chỉ sử dụng ${imagesPerPage}/${imagesPerRow} khung trong hàng. Có thể tối ưu layout.`)
  }
  
  return result
}

/**
 * Đề xuất layout tối ưu cho số ảnh cho trước
 */
export function suggestOptimalLayout(imagesPerPage: number): GridCalculationInput[] {
  const suggestions: GridCalculationInput[] = []
  
  // Try different combinations
  for (let imagesPerRow = 1; imagesPerRow <= A4_CONSTANTS.MAX_COLS; imagesPerRow++) {
    const input: GridCalculationInput = { imagesPerPage, imagesPerRow }
    const result = calculateGridLayout(input)
    
    if (result.isValid && result.errors.length === 0) {
      suggestions.push(input)
    }
  }
  
  // Sort by cell size (larger is better)
  return suggestions.sort((a, b) => {
    const resultA = calculateGridLayout(a)
    const resultB = calculateGridLayout(b)
    const areaA = resultA.cellWidth * resultA.cellHeight
    const areaB = resultB.cellWidth * resultB.cellHeight
    return areaB - areaA
  })
}