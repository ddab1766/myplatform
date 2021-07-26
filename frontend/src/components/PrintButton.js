// import React from 'react';
//
// const pxToMm = (px) => {
//   return Math.floor(px/document.getElementById('myMm').offsetHeight);
// };
// const mmToPx = (mm) => {
//   return document.getElementById('myMm').offsetHeight*mm;
// };
// const range = (start, end) => {
//     return Array(end-start).join(0).split(0).map(function(val, id) {return id+start});
// };
// const PrintButton = ({id, label,sigPadData}) => (<div className="tc mb4 mt2">
//   {/*
//     Getting pixel height in milimeters:
//     https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
//   */}
//   <div id="myMm" style={{height: "1mm"}} />
//   <div
//     className="pa2 ba bw1 b--black bg-yellow black-90 br2 dib pointer dim shadow-1"
//     onClick={() => {
//       const input = document.getElementById(id);
//       // const inputHeightMm = pxToMm(input.offsetHeight);
//       // const a4WidthMm = 157;
//       // const a4HeightMm = 222;
//       // const a4HeightPx = mmToPx(a4HeightMm);
//       // const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm/a4HeightMm) + 1;
//       // console.log({
//       //   input, inputHeightMm, a4HeightMm, a4HeightPx, numPages, range: range(0, numPages),
//       //   comp: inputHeightMm <= a4HeightMm, inputHeightPx: input.offsetHeight
//       // });
//
//
//       // html2canvas(input)
//       //   .then((canvas) => {
//       //     const imgData = canvas.toDataURL('image/png');
//       //
//       //     // Document of a4WidthMm wide and inputHeightMm high
//       //     if (inputHeightMm > a4HeightMm) {
//       //       // elongated a4 (system print dialog will handle page breaks)
//       //       var pdf = new jsPDF('p', 'mm', [inputHeightMm+16, a4WidthMm]);
//       //     } else {
//       //       // standard a4
//       //       var pdf = new jsPDF();
//       //     }
//       //
//       //     pdf.addImage(imgData, 'PNG', 0, 0);
//       //     pdf.save(`${id}.pdf`);
//       //   });
//       // ;
//
//         // html2canvas(document.querySelector('div[data-page-number="1"]'),{
//         //     allowTaint:true,
//         //     useCORS:true,
//         //     logging:false,
//         //     height:window.outerHeight+window.innerHeight,
//         //     windowHeight:window.outerHeight+window.innerHeight,
//         //     scrollY: -window.scrollY,
//         //      scale: 2,
//         // }).then(function(canvas){
//         //     var imgData = canvas.toDataURL('image/png',1);
//         //     var imgWidth = 210;
//         //     var pageHeight=imgWidth*1.414;
//         //     var imgHeight=canvas.height*imgWidth/canvas.width;
//         //     var heightLeft = imgHeight;
//         //     var doc = new jsPDF('p','mm');
//         //     var position = 0;
//         //     doc.addImage(imgData,'PNG',0,position,imgWidth,imgHeight);
//         //     heightLeft -= pageHeight;
//         //     while(heightLeft >= 20) {
//         //         position = heightLeft - imgHeight;
//         //         doc.addPage();
//         //         doc.addImage(imgData,'PNG',0,position,imgWidth,imgHeight);
//         //         heightLeft -= pageHeight;
//         //     }
//         //     doc.save('sample.pdf');
//         // })
// // var doc = new jsPDF('p', 'pt', 'a4');
// //       doc.html(input);
// //       doc.line(15, 30, 50, 30);
// //       doc.line(25, 50, 50, 30);
// // var blobPDF = new Blob([doc.output('blob')], {type: 'application/pdf'});
// //               var blobUrl = URL.createObjectURL(blobPDF);
// //               console.log(blobPDF, blobUrl);
// //               window.open(blobUrl, '_system', 'location=yes');
//
// var canvas = input
//
// var ctx = document.querySelector('.react-pdf__Page__canvas').getContext('2d');
//          ctx.fillRect(500,500, 100, 100);
//          var imageObj1 = new Image();
//          imageObj1.src = sigPadData
//          console.log(imageObj1)
//          ctx.drawImage(imageObj1,0,0)
//         console.log(ctx);
// //         var doc = new jsPDF("p", "mm", "a4");
// // doc.html(document.querySelector('div[data-page-number="1"]'), {
// //    callback: function (doc) {
// //      doc.save();
// //    },
// //    x: 10,
// //    y: 10
// // });
//
//
//     }}
//   >
//     {label}
//   </div>
// </div>);
//
// export default PrintButton;