'use client'

import { useEffect } from 'react'

export default function PrintHandler() {
  useEffect(() => {
    // Override browser print behavior
    const handleBeforePrint = () => {
      // Hide all browser UI elements
      document.body.style.margin = '0'
      document.body.style.padding = '0'
      document.documentElement.style.margin = '0'
      document.documentElement.style.padding = '0'
      
      // Add print-specific styles
      const printStyle = document.createElement('style')
      printStyle.id = 'dynamic-print-styles'
      printStyle.textContent = `
        @media print {
          /* FORCE REMOVE ALL BROWSER CONTENT */
          @page {
            size: A4 !important;
            margin: 15mm !important;
          }
          
          /* Hide everything except our content */
          body > *:not(.construction-report-page) {
            display: none !important;
          }
          
          /* Force clean layout */
          .construction-report-page {
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            page-break-inside: avoid !important;
          }
          
          /* Force title styles */
          .print-title {
            color: #1d4ed8 !important;
            font-size: 18pt !important;
            font-weight: bold !important;
            text-align: center !important;
            margin: 0 0 10pt 0 !important;
          }
          
          .print-subtitle {
            color: #374151 !important;
            font-size: 14pt !important;
            font-weight: 600 !important;
            text-align: center !important;
            margin: 0 0 15pt 0 !important;
          }
          
          /* Hide all interactive elements */
          .screen-only,
          .no-print,
          button,
          input,
          .cursor-pointer,
          [class*="hover:"] {
            display: none !important;
            visibility: hidden !important;
          }
          
          /* Force image visibility */
          .image-slot img {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
          }
        }
      `
      document.head.appendChild(printStyle)
    }
    
    const handleAfterPrint = () => {
      // Clean up
      const printStyle = document.getElementById('dynamic-print-styles')
      if (printStyle) {
        printStyle.remove()
      }
    }
    
    // Add event listeners
    window.addEventListener('beforeprint', handleBeforePrint)
    window.addEventListener('afterprint', handleAfterPrint)
    
    // Also handle Ctrl+P
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        handleBeforePrint()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint)
      window.removeEventListener('afterprint', handleAfterPrint)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  
  return null // This component doesn't render anything
}