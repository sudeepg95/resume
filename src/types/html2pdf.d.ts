declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | string;
    filename?: string;
    image?: {
      type?: string;
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      letterRendering?: boolean;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: string;
    };
  }

  interface Html2Pdf {
    set(_options: Html2PdfOptions): Html2Pdf;
    from(_element: Element): Html2Pdf;
    save(): Promise<void>;
  }

  function html2pdf(): Html2Pdf;

  export default html2pdf;
}
