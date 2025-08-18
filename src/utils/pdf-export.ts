interface PDFOptions {
  filename?: string;
  margin?: number;
  format?: 'a4' | 'letter';
  quality?: number;
}

class PDFExporter {
  private isExporting = false;

  async generatePDF(options: PDFOptions = {}) {
    if (this.isExporting) {
      console.warn('PDF export already in progress');
      return;
    }

    const {
      filename = 'resume.pdf',
      margin = 0.5,
      format = 'letter',
      quality = 0.98,
    } = options;

    this.isExporting = true;

    try {
      this.hideInteractiveElements();

      document.body.classList.add('print-mode');

      if (this.canUseBrowserPrint()) {
        this.triggerBrowserPrint();
      } else {
        await this.generateWithHtml2Pdf(filename, margin, format, quality);
      }
    } catch (error) {
      console.error('PDF export failed:', error);
      this.showError('Failed to export PDF. Please try again.');
    } finally {
      this.showInteractiveElements();
      document.body.classList.remove('print-mode');
      this.isExporting = false;
    }
  }

  private canUseBrowserPrint(): boolean {
    return typeof window !== 'undefined' && 'print' in window;
  }

  private triggerBrowserPrint() {
    setTimeout(() => {
      window.print();
    }, 100);
  }

  private async generateWithHtml2Pdf(
    filename: string,
    margin: number,
    format: string,
    quality: number
  ) {
    try {
      const html2pdf = await import('html2pdf.js');

      const element = document.querySelector('.cv-container');
      if (!element) {
        throw new Error('CV container not found');
      }

      const opt = {
        margin: margin,
        filename: filename,
        image: { type: 'jpeg', quality: quality },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: {
          unit: 'in',
          format: format,
          orientation: 'portrait',
        },
      };

      await html2pdf.default().set(opt).from(element).save();
    } catch (error) {
      console.error('html2pdf export failed:', error);
      throw new Error('PDF library not available');
    }
  }

  private hideInteractiveElements() {
    document.querySelectorAll('.no-print').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
  }

  private showInteractiveElements() {
    document.querySelectorAll('.no-print').forEach((el) => {
      (el as HTMLElement).style.display = '';
    });
  }

  private showError(message: string) {
    const notification = document.createElement('div');
    notification.className = 'pdf-error-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-error);
      color: white;
      padding: 1rem 2rem;
      border-radius: var(--border-radius, 0.375rem);
      z-index: 9999;
      font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
}

export const pdfExporter = new PDFExporter();
