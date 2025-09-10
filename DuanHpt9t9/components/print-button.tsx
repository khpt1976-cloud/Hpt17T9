'use client'

import { useState } from 'react'

interface PrintButtonProps {
  content: React.ReactNode
  title?: string
}

export default function PrintButton({ content, title = "In tài liệu" }: PrintButtonProps) {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    
    if (!printWindow) {
      alert('Vui lòng cho phép popup để in tài liệu')
      setIsPrinting(false)
      return
    }

    // Get the content HTML
    const contentElement = document.querySelector('.construction-report-page')
    if (!contentElement) {
      alert('Không tìm thấy nội dung để in')
      setIsPrinting(false)
      return
    }

    // Create clean HTML for printing
    const printHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          /* CLEAN PRINT STYLES - NO BROWSER INTERFERENCE */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            size: A4;
            margin: 15mm;
          }
          
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            line-height: 1.4;
            color: #000;
            background: white;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .construction-report-page {
            width: 100%;
            max-width: none;
            margin: 0;
            padding: 0;
            background: white;
          }
          
          .print-title {
            color: #1d4ed8;
            font-size: 18pt;
            font-weight: bold;
            text-align: center;
            margin: 0 0 10pt 0;
          }
          
          .print-subtitle {
            color: #374151;
            font-size: 14pt;
            font-weight: 600;
            text-align: center;
            margin: 0 0 15pt 0;
          }
          
          .image-grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 5mm;
            margin: 20px auto;
            width: 145mm;
            justify-content: center;
          }
          
          .image-slot {
            width: 70mm;
            height: 70mm;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
            background: #f8fafc;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .image-slot img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            border-radius: 6px;
          }
          
          /* Hide all interactive elements */
          .screen-only,
          .no-print,
          button,
          input,
          .cursor-pointer,
          [class*="hover:"],
          [style*="position: absolute"],
          [style*="cursor: pointer"] {
            display: none !important;
          }
          
          /* Force image visibility */
          img {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        </style>
      </head>
      <body>
        ${contentElement.outerHTML}
        <script>
          // Auto print when loaded
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
      </html>
    `

    // Write content to print window
    printWindow.document.write(printHTML)
    printWindow.document.close()
    
    setIsPrinting(false)
  }

  return (
    <button
      onClick={handlePrint}
      disabled={isPrinting}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
    >
      {isPrinting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Đang chuẩn bị...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          In tài liệu
        </>
      )}
    </button>
  )
}