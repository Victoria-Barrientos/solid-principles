// ❌ BAD — High-level depends on low-level

class XLSXExporter {
  export(data: string) {
    console.log(`📄 Exporting "${data}" report as XLSX...`);
  }
}

class ReportService {
  private exporter: XLSXExporter;

  constructor() {
    // 👎 Directly instantiating the dependency here
    this.exporter = new XLSXExporter();
  }

  generate(data: string) {
    console.log("🧾 Generating report...");
    this.exporter.export(data);
  }
}

// Usage
const reportService = new ReportService();
reportService.generate("Sales Report Q1");


interface Exporter {
    export(data: any): void
}


class InversedXLSXExporter implements Exporter {
    export(data: any): void {
        console.log(`📄 Exporting "${data}" report as XLSX...`);
    }
}

// High-level depends on abstraction
class InversedReportService {
    constructor(private exporter: Exporter) {}

  generate(data: string) {
    console.log("🧾 Generating report...");
    this.exporter.export(data);
  }
}

// Usage
const inversedReport = new InversedReportService(new InversedXLSXExporter())
inversedReport.generate("Marketing Report Q1")