import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const getAuraColor = (energy) => {
  const colors = {
    light: rgb(1, 0.95, 0.8),
    neutral: rgb(0.85, 0.92, 1),
    dark: rgb(0.88, 0.85, 1),
  };
  return colors[energy] || rgb(1, 1, 1);
};

export async function exportReflectionsAsPDF(reflectionLog = [], filename = 'Codex_Reflections.pdf') {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const titleSize = 18;
  const textSize = 12;

  let y = height - 40;

  page.setFont(font);
  page.setFontSize(titleSize);
  page.drawText('🕊️ Codex Lumina – Reflection Archive', {
    x: 50,
    y,
    color: rgb(0.3, 0.3, 0.5),
  });

  y -= 30;

  for (const entry of reflectionLog) {
    const aura = getAuraColor(entry.energy);
    const textBlock = `• ${entry.text}\n   – ${entry.lens} | ${entry.energy} | ${new Date(entry.timestamp).toLocaleString()}`;

    // Draw background aura box
    page.drawRectangle({
      x: 45,
      y: y - 48,
      width: width - 90,
      height: 48,
      color: aura,
      borderColor: rgb(0.7, 0.7, 0.9),
      borderWidth: 0.5,
      opacity: 0.15,
    });

    // Draw reflection text
    page.setFontSize(textSize);
    page.drawText(textBlock, {
      x: 50,
      y: y - 35,
      maxWidth: width - 100,
      color: rgb(0.2, 0.2, 0.2),
      lineHeight: 14,
    });

    // Optional pinned icon
    if (entry.pinned) {
      page.drawText('❤️', { x: width - 60, y: y - 30, size: 14 });
    }

    y -= 60;

    if (y < 80) {
      y = height - 40;
      page = pdfDoc.addPage();
      page.setFont(font);
    }
  }

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
