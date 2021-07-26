// import React, {useCallback, useRef, useState} from 'react'
// import PropTypes from 'prop-types'
// import SignatureCanvas from 'react-signature-canvas'
// import Modal, {Footer} from 'react-modal'
//
// const ModalSignatureCanvas = ({onSave, onHide, widthRatio, canvasProps, displayNameInput = false}) => {
//   const [signatureResult, setSignatureResult] = useState('')
//   const [name, setName] = useState('')
//   const sigCanvas = useRef({})
//   const sigPad = useRef({})
//
//   const setNameOnChange = (event) => {
//     setName(event.target.value)
//   }
//
//   const setSignatureOnChange = () => {
//     const dataURL = sigCanvas.current.toDataURL()
//     setSignatureResult(dataURL)
//   }
//
//   const saveInput = () => {
//     onSave({dataURL: signatureResult, name: name})
//   }
//
//   const clearInput = () => {
//     sigPad.current.clear()
//     setSignatureResult('')
//   }
//
//   const measuredRef = useCallback(node => {
//     const resizeCanvas = (signaturePad, canvas) => {
//       canvas.width = canvas.parentElement.clientWidth // width of the .canvasWrapper
//       canvas.height = canvas.parentElement.clientWidth / widthRatio
//       signaturePad.clear()
//     }
//
//     if (node !== null) {
//       sigCanvas.current = node.getCanvas()
//       sigPad.current = node.getSignaturePad()
//       resizeCanvas(node.getSignaturePad(), node.getCanvas())
//     }
//   }, [widthRatio])
//
//   const isNameValidIfRequired = (displayNameInput && !!name) || !displayNameInput
//   const isSignatureValid = !!signatureResult
//   const isFormValid = isNameValidIfRequired && isSignatureValid
//
//   return (
//     <Modal
//       title="Enter your signature"
//       onHide={onHide}
//     >
//       <div className="canvasWrapper">
//         <SignatureCanvas
//           canvasProps={canvasProps}
//           ref={measuredRef}
//           onEnd={setSignatureOnChange}
//         />
//       </div>
//       {displayNameInput &&
//         <div className="nameInput">
//           <label>Name of person entering signature:</label>
//           <input type="text" className="form-control" onChange={setNameOnChange} value={name} />
//         </div>}
//       <Footer>
//         <div className="btn-group btn-block">
//           <button type="button" className="btn btn-secondary w-50" onClick={clearInput}>Clear</button>
//           <button type="button" className="btn btn-primary w-50" onClick={saveInput} disabled={!isFormValid}>Save</button>
//         </div>
//       </Footer>
//     </Modal>
//   )
// }
// ModalSignatureCanvas.propTypes = {
//   canvasProps: PropTypes.object,
//   widthRatio: PropTypes.number.isRequired,
//   onSave: PropTypes.func,
//   onHide: PropTypes.func,
//   displayNameInput: PropTypes.bool,
// }
//
// export default ModalSignatureCanvas