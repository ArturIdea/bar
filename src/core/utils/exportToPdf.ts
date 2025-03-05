import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportToPDF(data: any[], fileName: string = 'export') {
  if (!data || data.length === 0) {
    console.warn('No data available to export.');
    return;
  }

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set document properties
  doc.setProperties({
    title: `${fileName} Export`,
    subject: 'Data Export',
    creator: 'Your Application',
  });

  // Add a title to the document
  doc.setFontSize(18);
  doc.text(fileName, 14, 22);

  // Convert data to table format with explicit typing
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const tableData = data.map((item) => headers.map((header) => String(item[header] ?? '')));

  // Add the table to the PDF
  autoTable(doc, {
    head: [headers],
    body: tableData,
    startY: 30,
    theme: 'striped',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: 'middle',
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 11,
    },
  });

  // Save the PDF
  doc.save(`${fileName}_${Date.now()}.pdf`);
}
