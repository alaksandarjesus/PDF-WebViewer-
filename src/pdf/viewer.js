import * as pdfjsLib  from 'pdfjs-dist/build/pdf';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
export class WebViewer{
    base64DataUri = null;
    constructor(base64DataUri){
        this.base64DataUri = base64DataUri;
    }

    render(){
        const loadingTask = pdfjsLib.getDocument(this.base64DataUri);
       return loadingTask.promise.then(function (pdf) {
            console.log('PDF loaded', pdf);
            // Fetch the first page
            var pageNumber = 1;
           return pdf.getPage(pageNumber).then(function (page) {
                console.log('Page loaded');
        
                var scale = 1.5;
                var viewport = page.getViewport({ scale: scale });
        
                // Prepare canvas using PDF page dimensions
                var canvas = document.getElementById('the-canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
        
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                return renderTask.promise.then(function () {
                    console.log('Page rendered');
                    return new Promise((resolve) => resolve(true))
                });
            });
        });
    }

   
}

