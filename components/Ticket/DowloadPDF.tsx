import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const downloadAsPdf = (componentID: string, outputFile: string) => {
    const doc = new jsPDF();
    (doc as any).autoTable({ html: '#' + componentID });
    doc.save(outputFile);
};