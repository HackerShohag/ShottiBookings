import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { randomBytes } from 'crypto';

interface ticketDetailsProps {
    date: string;
    time: string;
    source: string;
    destination: string;
    seatNumbers: string[];
    passengerName: string;
    busName: string;
}

export async function createTicket(ticketDetails: ticketDetailsProps) {

    const response = await fetch('./template.pdf');
    const existingPdfBytes = await response.arrayBuffer();

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()

    const randomChars = randomBytes(2).toString('hex').toUpperCase();
    const randomDigits = Math.floor(100000 + Math.random() * 900000);

    // Innovice Number
    firstPage.drawText(`${randomChars}${randomDigits}`, {
        x: 75,
        y: 177,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    })

    // date and time
    firstPage.drawText(ticketDetails.date, {
        x: 228,
        y: 185,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    })

    firstPage.drawText(ticketDetails.time, {
        x: 272,
        y: 174,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    })

    // passenser name and seat number
    firstPage.drawText(ticketDetails.passengerName, {
        x: 7,
        y: 155,
        size: 10,
        font: helveticaFont,
        color: rgb(0, 0, 0),
    })

    ticketDetails.seatNumbers.forEach((seat, index) => {
        firstPage.drawText(seat, {
            x: 165,
            y: 155 - (index * 10),
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0),
        })
    })


    // company name
    firstPage.drawText(ticketDetails.busName, {
        x: 200,
        y: 100,
        size: 20,
        font: helveticaFont,
        color: rgb(1, 1, 1),
    })

    // source and destination
    firstPage.drawText(ticketDetails.source, {
        x: 100,
        y: 45,
        size: 20,
        font: helveticaFont,
        color: rgb(1, 0, 0),
    })

    firstPage.drawText(ticketDetails.destination, {
        x: 350,
        y: 45,
        size: 20,
        font: helveticaFont,
        color: rgb(1, 0, 0),
    })

    const pdfBytes = await pdfDoc.save()
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });


    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const ticketName = `ticket_${currentDate.replace('-', '_')}_${currentTime.replace(':', '_').replace(' ', '_')}.pdf`;
    saveAs(pdfBlob, ticketName);
}