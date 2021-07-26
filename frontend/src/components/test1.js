// const SignatureCaptureInput = ({signature, signee, onClick, onHide, onSave, isModalOpen}) => {
//   const buttonText = signature ? 'Change signature' : 'Collect signature'
//   return (
//     <>
//       {signature &&
//         <img className="img-fluid border mb-2" src={signature} />}
//       {signee && <div className="blockquote-footer mb-2">{signee}</div>}
//       <button type="button" className={classNames('btn btn-block', {'btn-secondary': signature, 'btn-primary': !signature})} onClick={onClick}>{buttonText}</button>
//       {isModalOpen && <ModalSignatureCanvas widthRatio={3} onSave={onSave} onHide={onHide} displayNameInput />}
//     </>
//   )
// }
// SignatureCaptureInput.propTypes = {
//   signature: PropTypes.string,
//   signee: PropTypes.string,
//   onClick: PropTypes.func,
//   onHide: PropTypes.func,
//   onSave: PropTypes.func,
//   isModalOpen: PropTypes.bool,
// }
//
// // Usage
// const [isModalOpen, setModalOpen] = useState(false)
// const handleSignatureChange({dataURL, name}) => { ... }
//
// <SignatureCaptureInput
//   onSave={handleSignatureChange}
//   signee={clientSignee}
//   signature={clientSignature}
//   onClick={() => setModalOpen(true})}
//   onHide={() => setModalOpen(false})}
//   isModalOpen={isModalOpen}
// />