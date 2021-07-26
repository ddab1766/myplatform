import React from 'react';
// import {saveAs} from 'file-saver';
import {pdf, StyleSheet} from '@react-pdf/renderer';
import ResumeDocument from "../User/ResumeDocument";
// import NotoSansKR from "../../assets/fonts/NotoSansKR-Regular.otf"
// import NanumGothic from "../../assets/fonts/NanumGothic-Regular.ttf"

// Font.register({
//     family: 'Noto Sans KR',
//     format: "truetype",
//     src: NotoSansKR
// });
//
// Font.register({
//     family: 'NanumGothic',
//     src: NanumGothic
// })

// Font.register({
//     family: 'SpoqaHanSans',
//     format: "truetype",
//     src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf',
//     // fontStyle: 'normal',
//     // fontWeight: 'normal',
// });

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        fontFamily: 'Noto Sans KR'
    }
});

export async function generatePDFDocument(resume){
    const blobPdf = await pdf(<ResumeDocument resume={resume}/>);
    blobPdf.updateContainer(<ResumeDocument resume={resume}/>);
    const result = await blobPdf.toBlob();

    // saveAs(result, "document.pdf");
    return result
};

