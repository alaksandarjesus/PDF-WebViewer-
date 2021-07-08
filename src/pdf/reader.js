import { degrees, PDFDocument, rgb } from 'pdf-lib'
import { WebViewer } from './viewer';


export class WebReader {

  url = '';
  pdfDoc = null;
  constructor(url) {
    this.url = url;
    this.parsePdf();
  }

  async parsePdf() {
    const existingPdfBytes = await fetch(this.url).then(res => res.arrayBuffer())
    this.pdfDoc = await PDFDocument.load(existingPdfBytes);
  }


  getPdfDoc() {
    return new Promise((resolve) => {
      const awaitForPdfDoc = setInterval(() => {
        if (this.pdfDoc) {
          clearInterval(awaitForPdfDoc);
          return resolve(this.pdfDoc);
        }
      });
    })
  }

  async render() {
    const pdfDoc = await this.getPdfDoc();
    const base64DataUri = await pdfDoc.saveAsBase64({ dataUri: true })
    const webViewer = new WebViewer(base64DataUri);
    const render = webViewer.render();
    return render.then((res) => {
      return new Promise((resolve) => resolve(true));
    });

  }

  async drawAnnotations() {
    const pdfDoc = await this.getPdfDoc();
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('default', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      color: rgb(0.95, 0.1, 0.1),
      rotate: degrees(-45),
    })
    return this.render();
  }
  async drawRectangle() {
    const pdfDoc = await this.getPdfDoc();
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize();
    firstPage.drawRectangle({
      x: 40,
      y: 40,
      width: 100,
      height: 100,
      borderColor: rgb(1, 0, 0),
      borderWidth: 2,
    });
    return this.render();
  }
}
