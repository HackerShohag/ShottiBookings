import { PDFDocument } from 'pdf-lib'

// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()
const existingPdfBytes = new Uint8Array(); // Replace `new Uint8Array()` with the actual PDF bytes

// Load a PDFDocument without updating its existing metadata
const pdfDoc = await PDFDocument.load(existingPdfBytes, {
    updateMetadata: false
})

// Print all available metadata fields
console.log('Title:', pdfDoc.getTitle())
console.log('Author:', pdfDoc.getAuthor())
console.log('Subject:', pdfDoc.getSubject())
console.log('Creator:', pdfDoc.getCreator())
console.log('Keywords:', pdfDoc.getKeywords())
console.log('Producer:', pdfDoc.getProducer())
console.log('Creation Date:', pdfDoc.getCreationDate())
console.log('Modification Date:', pdfDoc.getModificationDate())