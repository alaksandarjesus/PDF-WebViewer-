import { WebReader } from './pdf/reader';
const url = '/pdfs/test.pdf';

const webReader = new WebReader(url);


// const drawAnnotations = webReader.drawAnnotations();

// const drawRectangle = webReader.drawRectangle();

const drawAnnotations = webReader.drawAnnotations();
drawAnnotations.then(() => {
    console.log("i am executed after defaultDrawAnnotations");
    const drawRectangle = webReader.drawRectangle();
    drawRectangle.then(() => {
        console.log(" i am executed after drawRectangle")
    });
});


