"use client"

import { useState, useRef } from 'react'
import { useToast } from "@/hooks/use-toast"

interface ImageGridEditorProps {
  pageNumber: number
  imagesPerPage: number
  imagesPerRow: number
  images: (string | null)[]
  onImageChange: (slotIndex: number, imageData: string) => void
  readonly?: boolean
}

export default function ImageGridEditor({
  pageNumber,
  imagesPerPage,
  imagesPerRow,
  images,
  onImageChange,
  readonly = false
}: ImageGridEditorProps) {
  const { toast } = useToast()
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const rows = Math.ceil(imagesPerPage / imagesPerRow)
  const cellWidth = Math.floor(160 / imagesPerRow) // mm
  const cellHeight = Math.floor(180 / rows) // mm

  const handleImageSlotClick = async (slotIndex: number) => {
    console.log(`🖼️ Image slot ${slotIndex} clicked on page ${pageNumber}, readonly: ${readonly}`)
    
    if (readonly) {
      console.log(`❌ Cannot click - page is readonly`)
      return
    }
    
    console.log(`✅ Processing click for slot ${slotIndex}`)
    
    // Create file input if not exists
    if (!fileInputRefs.current[slotIndex]) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.style.display = 'none'
      document.body.appendChild(input)
      fileInputRefs.current[slotIndex] = input
    }

    const input = fileInputRefs.current[slotIndex]
    if (!input) return

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      console.log('📁 File selected:', file.name, 'Size:', file.size, 'Type:', file.type)

      // Validate file
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn file ảnh!",
          variant: "destructive",
        })
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Lỗi", 
          description: "File ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 5MB.",
          variant: "destructive",
        })
        return
      }

      // CROP ẢNH THÀNH HÌNH VUÔNG TRƯỚC KHI LỮU
      const cropImageToSquare = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          if (!ctx) {
            reject('Cannot create canvas context')
            return
          }
          
          img.onload = () => {
            // Tính kích thước crop (lấy cạnh nhỏ nhất)
            const size = Math.min(img.width, img.height)
            
            // Set canvas thành hình vuông
            canvas.width = size
            canvas.height = size
            
            // Tính vị trí crop để center ảnh
            const cropX = (img.width - size) / 2
            const cropY = (img.height - size) / 2
            
            // Vẽ ảnh đã crop lên canvas
            ctx.drawImage(
              img,
              cropX, cropY, size, size,  // Source crop area
              0, 0, size, size           // Destination area
            )
            
            // Convert thành base64
            const croppedImageData = canvas.toDataURL('image/jpeg', 0.9)
            resolve(croppedImageData)
          }
          
          img.onerror = () => reject('Failed to load image')
          
          // Load ảnh từ file
          const reader = new FileReader()
          reader.onload = (e) => {
            img.src = e.target?.result as string
          }
          reader.readAsDataURL(file)
        })
      }

      // Crop ảnh thành hình vuông trước khi lưu
      try {
        const croppedImageData = await cropImageToSquare(file)
        console.log('✂️ Image cropped to square, length:', croppedImageData.length)
        
        onImageChange(slotIndex, croppedImageData)
        
        toast({
          title: "Thành công",
          description: `Đã thêm ảnh "${file.name}" (đã crop thành hình vuông) vào vị trí ${slotIndex + 1}`,
        })
      } catch (error) {
        console.error('❌ Error cropping image:', error)
        toast({
          title: "Lỗi",
          description: "Không thể xử lý ảnh! Vui lòng thử lại.",
          variant: "destructive",
        })
      }
    }

    // Trigger file picker
    input.click()
  }

  const renderImageSlot = (slotIndex: number) => {
    const hasImage = images[slotIndex]
    const imageUrl = hasImage || ''

    return (
      <div
        key={slotIndex}
        className={`
          relative cursor-pointer transition-all duration-200 rounded-lg overflow-hidden image-slot
          ${hasImage ? 'border-4 border-solid border-green-500' : 'border-4 border-dashed border-blue-500'}
          ${!readonly ? 'hover:border-blue-700 hover:scale-105 hover:shadow-lg' : ''}
          ${readonly ? 'cursor-not-allowed opacity-75' : ''}
        `}
        style={{
          width: '70mm',
          height: '70mm',
          minWidth: '70mm',
          minHeight: '70mm',
          maxWidth: '70mm',
          maxHeight: '70mm',
          backgroundColor: hasImage ? '#f0f9ff' : '#f8fafc',
          // Ensure print compatibility
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact',
        }}
        onClick={() => handleImageSlotClick(slotIndex)}
        title={`Click để ${hasImage ? 'thay' : 'thêm'} ảnh ${slotIndex + 1}`}
      >
        {hasImage ? (
          <>
            <img
              src={imageUrl}
              alt={`Ảnh ${slotIndex + 1}`}
              className="w-full h-full object-cover"
              style={{ 
                borderRadius: '4px',
                // Ensure print compatibility
                printColorAdjust: 'exact',
                WebkitPrintColorAdjust: 'exact',
                colorAdjust: 'exact',
                // Force visibility in print
                display: 'block',
                visibility: 'visible',
                opacity: 1,
              }}
            />
            <div className="absolute top-1 right-1 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded screen-only">
              Click để thay ảnh
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 screen-only">
            <div className="w-8 h-8 border-2 border-blue-500 rounded flex items-center justify-center text-blue-500 font-bold text-xl mb-2">
              +
            </div>
            <div className="text-sm font-medium">Click để thêm ảnh</div>
            <div className="text-xs text-gray-400 mt-1">Ảnh {slotIndex + 1}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="construction-report-page">
      <div className="image-grid-container">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-blue-700 mb-2 print-title">Báo cáo thi công</h2>
        <p className="text-gray-600 text-sm mb-4 print-subtitle">Trang {pageNumber}</p>
        <h3 className="text-lg font-semibold text-gray-800 print-subtitle">Hình ảnh thi công</h3>
      </div>

      {/* Image Grid */}
      <div 
        className={`grid gap-3 mx-auto image-grid-2x2`}
        style={{
          gridTemplateColumns: '70mm 70mm',
          gridTemplateRows: '70mm 70mm',
          gap: '5mm',
          width: '145mm',
          height: '145mm',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
          display: 'grid',
          justifyItems: 'center'
        }}
      >
        {Array.from({ length: imagesPerPage }, (_, index) => renderImageSlot(index))}
      </div>

      {/* Footer */}
      <div className="text-center mt-6 pt-4 border-t border-gray-200 text-gray-500 text-sm print-footer">
        Trang {pageNumber} - {imagesPerPage} ảnh ({imagesPerRow} ảnh/hàng) - {rows} hàng
      </div>
      </div>
    </div>
  )
}