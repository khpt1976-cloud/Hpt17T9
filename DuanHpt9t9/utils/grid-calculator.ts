/**
 * Grid Layout Calculator for A4 Construction Report Pages
 * Tính toán kích thước khung ảnh dựa trên input người dùng và constraints khổ A4
 */

/**
 * Parse aspect ratio string to width/height ratio
 * @param aspectRatio - String like "4:3", "16:9", etc.
 * @returns Object with width and height ratio
 */
function parseAspectRatio(aspectRatio: string): { widthRatio: number; heightRatio: number } {
  const [widthStr, heightStr] = aspectRatio.split(':')
  const widthRatio = parseInt(widthStr) || 4
  const heightRatio = parseInt(heightStr) || 3
  return { widthRatio, heightRatio }
}

export interface GridCalculationInput {
  imagesPerPage: number    // Số ảnh muốn chèn
  imagesPerRow: number     // Số khung theo chiều ngang
  // THÊM: Margin parameters tùy chỉnh
  marginLeft?: number      // mm - Margin trái (mặc định 10mm)
  marginRight?: number     // mm - Margin phải (mặc định 10mm)
  marginBottom?: number    // mm - Margin đáy (mặc định 10mm)
  marginHeader?: number    // mm - Khoảng cách từ đỉnh giấy đến khung ảnh (mặc định 45mm)
  // THÊM: Tỷ lệ ảnh
  aspectRatio?: string     // Tỷ lệ ảnh (mặc định "4:3")
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
  
  // THÊM: Margin và available space info
  margins: {
    left: number
    right: number
    bottom: number
    header: number
  }
  availableArea: {
    width: number          // mm - Không gian khả dụng cho grid
    height: number         // mm
  }
}

// Constants - Khổ A4 và constraints
const A4_CONSTANTS = {
  // A4 paper size
  PAPER_WIDTH: 210,       // mm
  PAPER_HEIGHT: 297,      // mm
  
  // Available area for images (TĂNG CHIỀU CAO ĐỂ CÓ THÊM KHÔNG GIAN)
  AVAILABLE_WIDTH: 180,   // mm (210 - 30 margin) - conservative
  AVAILABLE_HEIGHT: 220,  // mm (GIẢM ĐỂ ĐẢM BẢO KHUNG VUÔNG VỪA VẶN)
  
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
 * Tính toán layout grid dựa trên input người dùng - STRICT 4x5 LIMITS
 */
export function calculateGridLayout(input: GridCalculationInput): GridCalculationResult {
  const { 
    imagesPerPage, 
    imagesPerRow,
    // THÊM: Margin parameters với giá trị mặc định
    marginLeft = 10,
    marginRight = 10,
    marginBottom = 10,
    marginHeader = 45,
    // THÊM: Aspect ratio với giá trị mặc định
    aspectRatio = "4:3"
  } = input
  
  // Initialize result với margin info
  const result: GridCalculationResult = {
    cellWidth: 0,
    cellHeight: 0,
    rows: 0,
    cols: imagesPerRow,
    isValid: false,
    warnings: [],
    errors: [],
    totalGridWidth: 0,
    totalGridHeight: 0,
    // THÊM: Margin và available area info
    margins: {
      left: marginLeft,
      right: marginRight,
      bottom: marginBottom,
      header: marginHeader
    },
    availableArea: {
      width: 0,
      height: 0
    }
  }
  
  // Validation 1: Basic input validation
  if (imagesPerPage <= 0 || imagesPerRow <= 0) {
    result.errors.push("Số ảnh và số khung/hàng phải lớn hơn 0")
    return result
  }
  
  // Validation 2: STRICT Maximum constraints - KHÔNG CHO PHÉP VƯỢT QUÁ
  if (imagesPerPage > A4_CONSTANTS.MAX_IMAGES_PER_PAGE) {
    result.errors.push(`❌ VƯỢT QUÁ GIỚI HẠN: Tối đa ${A4_CONSTANTS.MAX_IMAGES_PER_PAGE} ảnh trên 1 trang. Bạn đang cố thêm ${imagesPerPage} ảnh.`)
    return result
  }
  
  if (imagesPerRow > A4_CONSTANTS.MAX_COLS) {
    result.errors.push(`❌ VƯỢT QUÁ GIỚI HẠN: Tối đa ${A4_CONSTANTS.MAX_COLS} khung theo chiều ngang. Bạn đang cố tạo ${imagesPerRow} khung/hàng.`)
    return result
  }
  
  // Calculate rows
  const rows = Math.ceil(imagesPerPage / imagesPerRow)
  result.rows = rows
  
  // Validation 3: STRICT Maximum rows - KHÔNG CHO PHÉP VƯỢT QUÁ
  if (rows > A4_CONSTANTS.MAX_ROWS) {
    result.errors.push(`❌ VƯỢT QUÁ GIỚI HẠN: Với ${imagesPerRow} khung/hàng và ${imagesPerPage} ảnh sẽ tạo ${rows} hàng. Tối đa chỉ được ${A4_CONSTANTS.MAX_ROWS} hàng.`)
    return result
  }
  
  // TÍNH TOÁN AVAILABLE SPACE VỚI MARGIN TÙY CHỈNH
  const availableWidth = A4_CONSTANTS.PAPER_WIDTH - marginLeft - marginRight
  const availableHeight = A4_CONSTANTS.PAPER_HEIGHT - marginHeader - marginBottom
  
  // Cập nhật available area trong result
  result.availableArea.width = availableWidth
  result.availableArea.height = availableHeight
  
  // Calculate available space for cells (minus gaps)
  const totalGapWidth = (imagesPerRow - 1) * A4_CONSTANTS.GAP_SIZE
  const totalGapHeight = (rows - 1) * A4_CONSTANTS.GAP_SIZE
  
  const availableWidthForCells = availableWidth - totalGapWidth
  const availableHeightForCells = availableHeight - totalGapHeight
  
  // Parse aspect ratio
  const { widthRatio, heightRatio } = parseAspectRatio(aspectRatio)
  const aspectRatioValue = widthRatio / heightRatio

  // Calculate cell dimensions based on aspect ratio
  const maxCellWidth = Math.floor(availableWidthForCells / imagesPerRow)
  const maxCellHeight = Math.floor(availableHeightForCells / rows)

  // Calculate optimal cell size based on aspect ratio
  let finalCellWidth: number
  let finalCellHeight: number

  // Try fitting by width first
  const cellWidthByWidth = maxCellWidth
  const cellHeightByWidth = Math.floor(cellWidthByWidth / aspectRatioValue)

  // Try fitting by height first  
  const cellHeightByHeight = maxCellHeight
  const cellWidthByHeight = Math.floor(cellHeightByHeight * aspectRatioValue)

  // Choose the option that fits better
  if (cellHeightByWidth <= maxCellHeight && cellWidthByWidth <= maxCellWidth) {
    // Width-constrained fits
    finalCellWidth = cellWidthByWidth
    finalCellHeight = cellHeightByWidth
  } else if (cellWidthByHeight <= maxCellWidth && cellHeightByHeight <= maxCellHeight) {
    // Height-constrained fits
    finalCellWidth = cellWidthByHeight
    finalCellHeight = cellHeightByHeight
  } else {
    // Neither fits perfectly, use smaller option
    if (cellWidthByWidth * cellHeightByWidth > cellWidthByHeight * cellHeightByHeight) {
      finalCellWidth = cellWidthByWidth
      finalCellHeight = Math.min(cellHeightByWidth, maxCellHeight)
    } else {
      finalCellWidth = Math.min(cellWidthByHeight, maxCellWidth)
      finalCellHeight = cellHeightByHeight
    }
  }

  // Apply minimum size constraints
  const minSize = A4_CONSTANTS.MIN_CELL_SIZE
  if (finalCellWidth < minSize || finalCellHeight < minSize) {
    result.warnings.push(`⚠️ Khung ảnh rất nhỏ (${finalCellWidth}x${finalCellHeight}mm). Khuyến nghị giảm số khung/hàng hoặc số ảnh.`)
  }

  // Apply maximum size constraints
  const maxSize = A4_CONSTANTS.MAX_CELL_SIZE
  finalCellWidth = Math.min(maxSize, finalCellWidth)
  finalCellHeight = Math.min(maxSize, finalCellHeight)
  
  // Đã xử lý warnings ở trên - xóa duplicate code
  
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