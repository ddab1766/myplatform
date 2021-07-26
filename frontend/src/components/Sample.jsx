// import React, {useRef, useState} from 'react';
// import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import './Sample.css';
// import {pdfjs} from 'react-pdf';
// import styled from "styled-components";
// // import SignaturePad from "signature_pad";
// import {Rnd} from 'react-rnd';
// import Popup from "reactjs-popup"
// import SignaturePad from 'react-signature-canvas'
//
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//
//
// const style = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "solid 1px #ddd",
//     background: "#0000001f",
//     zIndex:'999999'
// };
// const Title = styled.p`
//     font-weight:bold;
//     font-size:40px;
// `;
// const options = {
//     cMapUrl: 'cmaps/',
//     cMapPacked: true,
// };
// let sigPad = null;
//
//
// export default function Sample() {
//     const [file, setFile] = useState('./sample.pdf');
//     const [numPages, setNumPages] = useState(null);
//     const [sigPadData, setSigPadData] = useState(null);
//     const [test,setTest] = useState(null)
//     const [dragShow,setDragShow] = useState(false)
//     const [dragX, setDragX] = useState(0)
//     const [dragY, setDragY] = useState(0)
//     const [mouseX, setMouseX] = useState(0)
//     const [mouseY, setMouseY] = useState(0)
//     const [clicked, setClicked] = useState(false)
//     const [x,setX] = useState();
//     const [y,setY] = useState()
//     const [items, setItems] = useState([])
//     const [modal, setModal] = useState(false);
//     const signRef = useRef();
//     const sigCanvas = useRef();
//
//     const toggleModal = () => {
//         setModal(!modal)
//
//
//     };
//     // useEffect(() => {
//     //         sigPad = new SignaturePad(signRef.current, {
//     //             onBegin: () => {
//     //                 setSigPadData(sigPad.toDataURL("image/svg+xml")); // data:image/png;base64,iVBORw0K...
//     //
//     //                 /**
//     //                  * signaturePad.toDataURL(); // save image as PNG
//     //                  * signaturePad.toDataURL("image/jpeg"); // save image as JPEG
//     //                  * signaturePad.toDataURL("image/svg+xml"); // save image as SVG
//     //                  * */
//     //             }
//     //         });
//     // }, [signRef]);
//     const save = () => {
//         setSigPadData(sigCanvas.current.getTrimmedCanvas().toDataURL("image/svg+xml"));
//     }
//     // const ref = React.createRef();
//     function onFileChange(event) {
//         setFile(event.target.files[0]);
//         console.log(event.target.files[0])
//     }
//     const handleRestSignature = () => {
//         sigPad.clear();
//         setSigPadData();
//     };
//     function onDocumentLoadSuccess({ numPages: nextNumPages }) {
//         setNumPages(nextNumPages);
//     }
//
//     const handleDrag = (data) => {
//         console.log(data);
//         if(data.clientX < 0){
//             data.offset({left:0})
//         }
//         if(data.clientY < 0){
//             data.offset({top:0})
//         }
//     }
//
//     const test1 = () => {
//         var ctx = document.querySelector('.react-pdf__Page__canvas').getContext('2d');
//         ctx.fillRect(500,500, 100, 100);
//         var imageObj1 = new Image();
//         imageObj1.src = sigPadData
//         console.log(imageObj1)
//         ctx.drawImage(imageObj1,0,0)
//         console.log(ctx);
//     }
//
//     const handleClick = (e) => {
//         // e.currentTarget
//         console.log(e.currentTarget.dataset.pageNumber)
//         console.log('nativeEvent',e.nativeEvent.pageX,e.nativeEvent.pageY)
//         console.log('nativeEvent',e.nativeEvent.offsetX,e.nativeEvent.offsetY)
//         if(dragShow){
//             setDragShow(!dragShow)
//         }
//         const i = <div style={{position:'absolute',transform: `translate(${e.nativeEvent.pageX}px, ${e.nativeEvent.pageY}px)`}}>test1</div>
//         setItems([...items,i])
//         // document.querySelector('div[data-page-number="1"]').prepend(t)
//         // ReactDOM.render( t, document.querySelector('div[data-page-number="1"] > .greeting'));
//     }
//
//     return (
//         <>
//             <Popup modal trigger={<button>Open Signature Pad</button>}
//                    closeOnDocumentClick={false} >
//                 {close => (
//                     <>
//                         <SignaturePad ref={sigCanvas} canvasProps={{
//                             width: 500, height: 200,
//                             className:"signatureCanvas"
//                         }}
//                         />
//                         <button onClick={save}>Save</button>
//                         <button onClick={close}>Close</button>
//                     </>
//                 )}
//             </Popup>
//             {sigPadData ? (
//                 <Rnd
//                     style={style}
//                     default={{
//                         x: 0,
//                         y: 0,
//                         width: 320,
//                         height: 200
//                     }}
//                     onResize={(e, direction, ref, delta, position) => {
//                         // setX(ref.offsetWidth)
//                         setX(ref.offsetWidth)
//                         setY(ref.offsetWidth*0.6)
//                         console.log(ref.offsetHeight)
//                     }}
//                 >
//                     <div style={{position: 'relative', userSelect: 'auto',
//                         boxSizing: 'border-box',width:'100%',height:'100%'}} >
//                         <img src={sigPadData} id="canvas"  style={{WebkitUserDrag: 'none' ,    left: '0',
//                             margin: '0',
//                             // position: 'absolute',
//                             top: '0',
//                             width: '100%',height:'100%'}}/>
//                     </div>
//                 </Rnd>
//             ) : null}
//             {/*<button onClick={toggleModal}>서명하기</button>*/}
//
//             <div id="react-root" style={{height:'100vh'}}
//                 // onMouseMove={(e) => {setMouseX(e.pageX-150);setMouseY(e.pageY-500);}}
//             >
//
//                 {/*<PrintButton id={"multiPage"} label={"Print multiplate pages"} sigPadData={sigPadData}/>*/}
//                 <div className="Example">
//                     <header>
//                         <h1>react-pdf sample page</h1>
//                     </header>
//                     <div className="Example__container">
//                         <div className="Example__container__load">
//                             <label htmlFor="file">Load from file:</label>
//                             {' '}
//                             <input
//                                 onChange={onFileChange}
//                                 type="file"
//                             />
//                         </div>
//
//                         <div className="Example__container__document" id={"multiPage"}>
//
//                             <Document
//                                 file={file}
//                                 onLoadSuccess={onDocumentLoadSuccess}
//                                 options={options}
//                                 onClick={(e) => {handleClick(e)}}
//                             >
//
//
//
//
//                                 {
//                                     Array.from(
//                                         new Array(numPages),
//                                         (el, index) => (
//                                             <Page
//                                                 key={`page_${index + 1}`}
//                                                 pageNumber={index + 1}
//                                                 onMouseOver={(e) => {setTest(index+1)}}
//
//                                             />
//
//                                         ),
//                                     )
//                                 }
//                             </Document>
//                         </div>
//
//                     </div>
//                 </div>
//
//             </div>
//         </>
//     );
// }