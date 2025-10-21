// ❌ BAD — One interface forcing all exporters to implement everything
interface ReportExporter {
  exportPDF(): void;
  exportExcel(): void;
  exportCSV(): void;
}

class PDFExporter implements ReportExporter {
  exportPDF(): void {
    console.log("📄 Exporting as PDF...");
  }

  exportExcel(): void {
    throw new Error("❌ PDF exporter can't export Excel");
  }

  exportCSV(): void {
    throw new Error("❌ PDF exporter can't export CSV");
  }
}

class ExcelExporter implements ReportExporter {
  exportPDF(): void {
    throw new Error("❌ Excel exporter can't export PDF");
  }

  exportExcel(): void {
    console.log("📊 Exporting as Excel...");
  }

  exportCSV(): void {
    throw new Error("❌ Excel exporter can't export CSV");
  }
}

// Resolving by segregating interfaces

interface PDFExplortable {
  exportPDF(): void
}

interface ExcelExportable {
  exportExcel(): void
}

interface CSVExportable {
  exportCSV(): void
}

// ✅ Classes implement only what they actually support
class SegregatedPDFExporter implements PDFExplortable {
  exportPDF(): void {
    console.log("📄 Exporting as PDF...");
  }
}

class SegregatedExcelExporter implements ExcelExportable {
  exportExcel(): void {
    console.log("📊 Exporting as Excel...");
  }
}

class SegregatedCSVExporter implements CSVExportable {
  exportCSV(): void {
    console.log("🧾 Exporting as CSV...");
  }
}