import jsPDF from 'jspdf';

export const exportToPDF = (
  calculatorTitle: string,
  inputs: Record<string, any>,
  results: Record<string, any>,
  aiExplanation?: string
) => {
  const doc = new jsPDF();

  // Header Styling
  doc.setFillColor(59, 130, 246); // Brand blue
  doc.rect(0, 0, 210, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CalcHub AI - Calculation Report', 14, 18);

  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 140, 18);

  let y = 40;

  // Title Section
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Calculator: ${calculatorTitle}`, 14, y);
  y += 10;

  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, 196, y);
  y += 10;

  // Inputs Section
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175);
  doc.text('Input Parameters:', 14, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);

  Object.entries(inputs).forEach(([key, val]) => {
    doc.text(`• ${key.replace(/([A-Z])/g, ' $1')}: ${val}`, 20, y);
    y += 7;
  });

  y += 6;

  // Results Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('Calculation Output / Results:', 14, y);
  y += 8;

  doc.setFontSize(12);
  doc.setTextColor(16, 185, 129); // Green for results

  Object.entries(results).forEach(([key, val]) => {
    doc.text(`✔ ${key.replace(/([A-Z])/g, ' $1')}: ${val}`, 20, y);
    y += 8;
  });

  y += 10;

  // AI Step-by-Step explanation if provided
  if (aiExplanation) {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(147, 51, 234); // Accent Purple
    doc.text('AI Step-by-Step Breakdown:', 14, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);

    const cleanLines = aiExplanation.replace(/###/g, '').replace(/\*\*/g, '').split('\n');
    cleanLines.forEach((line) => {
      if (line.trim()) {
        const splitText = doc.splitTextToSize(line, 180);
        doc.text(splitText, 14, y);
        y += splitText.length * 5;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      }
    });
  }

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('CalcHub AI Smart Suite — https://calchub-ai.com', 14, 285);

  doc.save(`${calculatorTitle.toLowerCase().replace(/\s+/g, '_')}_report.pdf`);
};
