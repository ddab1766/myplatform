// import React, {useEffect, useState} from "react";
// import SignaturePad from "signature_pad";
// import {Viewer, Worker} from '@react-pdf-viewer/core';
// import Draggable from 'react-draggable';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import {Container} from "reactstrap"
// import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
// import Doc from "./DocService";
// import PdfContainer from "./PdfContainer";
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import {Rnd} from 'react-rnd';
// import PrintButton from "./PrintButton";
//
// let sigPad = null;
// const style = {
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   border: "solid 1px #ddd",
//   background: "#f0f0f0"
// };
//
// const Signature = () => {
//     const defaultLayoutPluginInstance = defaultLayoutPlugin();
//     const [sigPadData, setSigPadData] = useState(null);
//     const [url, setUrl] = React.useState('');
//     const [position, setPosition] = useState(null);
//     const [dragShow,setDragShow] = useState(false)
//     const [mouseX, setMouseX] = useState(0)
//     const [mouseY, setMouseY] = useState(0)
//     const [items, setItems] = useState([])
// // Handle the `onChange` event of the `file` input
//     const  createPdf = html => Doc.createPdf(html);
//     const handleDrag = (data) => {
//         console.log(mouseX,mouseY);
//         if(data.clientX < 0){
//             data.offset({left:0})
//         }
//         if(data.clientY < 0){
//             data.offset({top:0})
//         }
//     }
//     const test1 = () => {
//         setDragShow(true)
//     }
//     const onChange = (e) => {
//         const files = e.target.files;
//         (files.length > 0) && setUrl(URL.createObjectURL(files[0]));
//     };
//     useEffect(() => {
//         sigPad = new SignaturePad(document.querySelector("canvas"), {
//             onBegin: () => {
//                 setSigPadData(sigPad.toDataURL()); // data:image/png;base64,iVBORw0K...
//
//                 /**
//                  * signaturePad.toDataURL(); // save image as PNG
//                  * signaturePad.toDataURL("image/jpeg"); // save image as JPEG
//                  * signaturePad.toDataURL("image/svg+xml"); // save image as SVG
//                  * */
//             }
//         });
//     }, []);
//
//     const handleRestSignature = () => {
//         sigPad.clear();
//         setSigPadData();
//     };
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
//     // console.log(mouseX,mouseY)
//     return (
//         <>
//           <Rnd
//     style={style}
//     default={{
//       x: 0,
//       y: 0,
//       width: 320,
//       height: 200
//     }}
//   >
//     <img src={sigPadData} />
//   </Rnd>
//             <PrintButton id={"multiPage"} label={"Print multiplate pages"} />
//     <div className="Signature">
//                 <canvas
//                     width={300}
//                     height={325}
//                     style={{ border: "1px solid #cdcdcd",background:'white'}}
//                 />
//                 <button onClick={handleRestSignature}>리셋</button>
//             </div>
// {dragShow && <Draggable
//                 // axis="x"
//                 handle=".handle"
//                 // defaultPosition={{x: 0, y: 0}}
//                 position={{x: mouseX, y: mouseY}}
//                 grid={[25, 25]}
//                 scale={1}
//
//                 // onStart={this.handleStart}
//                 // onDrag={handleDrag}
//                 // onStop={this.handleStop}
//             >
//                 <img src={sigPadData} style={{width:'300px',position:'absolute',zIndex:'101'}}/>
//                 {/*<div style={{backgroundColor:'red', width:'100px',position:'absolute',zIndex:'101'}}>*/}
//                 {/*    <div className="handle">Drag from here</div>*/}
//                 {/*    <div className="handle">싸인</div>*/}
//                 {/*</div>*/}
//             </Draggable> }
//
//             <Container>
//
//                 <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
//
//                     <div id="react-root" style={{height:'100vh'}}
//                          // onMouseMove={(e) =>  {setMouseX(e.pageX-350);setMouseY(e.pageY-500);}}
//                     >
//
//
//
//
//
//                         <button onClick={test1}>서명</button>
//
//                         <input type="file" accept=".pdf" onChange={(e) => onChange(e)} />
//
//                         <div>
//                             {
//                                 url
//                                     ? (
//
//                                         <div
//                                             style={{
//                                                 border: '1px solid rgba(0, 0, 0, 0.3)',
//                                                 height: '100%',
//                                             }}
//                                             // onClick={(e) => {handleClick(e)}}
//                                         >
//                                             <PdfContainer createPdf={createPdf} id={"multiPage"}>
//                                                 <Viewer fileUrl={url}
//                                                         onPageChange={(e) => console.log(e)}
//                                                         plugins={[
//                                                             defaultLayoutPluginInstance,
//                                                         ]}
//
//                                                 />
//                                                 <div style={{zIndex: '101',position:'absolute',top:'0',left:'0'}}>
//                                                     {items}
//                                                 </div>
//                                             </PdfContainer>
//                                         </div>
//
//                                     )
//                                     : (
//                                         <div
//                                             style={{
//                                                 alignItems: 'center',
//                                                 border: '2px dashed rgba(0, 0, 0, .3)',
//                                                 display: 'flex',
//                                                 fontSize: '2rem',
//                                                 height: '100%',
//                                                 justifyContent: 'right',
//                                                 width: '50%',
//                                             }}
//                                         >
//                                             Preview area
//
//
//
//
//                                         </div>
//                                     )
//                             }
//
//
//
//
//
//
//
//                         </div>
//                     </div>
//                 </Worker>
//             </Container>
//         </>
//     );
// };
//
// export default Signature;
