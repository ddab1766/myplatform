import React from "react";
import PropTypes from "prop-types";
import {Button} from "reactstrap";
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/default-avatar.png";

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      imagePreviewUrl:this.props.avatar ? defaultAvatar : defaultImage
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidMount() {
    console.log('', this.props.imagePreviewUrl);
    console.log('componentDidMount this props', this.props);
    if (this.props.imagePreviewUrl && this.props.imagePreviewUrl.length > 0) {
      this.setState({
        imagePreviewUrl: this.props.imagePreviewUrl
      })
    }
  }

  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
    if(this.props.setProfileImage){
      this.props.setProfileImage(file)
      // console.log('handleImageChage?', file)
      // store.dispatch(this.props.uploadProfileImage(file))
    }

    this.props.handleImage(file,this.props.field);
  }
  handleSubmit(e) {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  handleRemove() {
    this.setState({
      file: null,
      imagePreviewUrl: this.props.avatar ? defaultAvatar : defaultImage
    });
    this.refs.fileInput.value = null;
  }
  render() {
    return (
        <>
          {/*<div className="text-left">{this.props.avatar ? "로고이미지" : "기본이미지"}</div>*/}
          <br/>
          <div className="fileinput text-center" style={{width:'100%'}}>
            <input type="file" onChange={this.handleImageChange} ref="fileInput" />
            <div className={"thumbnail" + (this.props.avatar ? " img-circle" : "")}>
              <img src={this.state.imagePreviewUrl} alt="..." />
            </div>
            <div>
              {this.state.file === null ? (
                  <Button className="btn-info" onClick={() => this.handleClick()}>
                    {/*{this.props.avatar ? "이미지 등록" : ""}*/}
                    이미지 등록
                  </Button>
              ) : (
                  <span>
              <Button className="btn-info" onClick={() => this.handleClick()}>
                변경
              </Button>
                    <Button
                        color="danger"
                        className=""
                        onClick={() => this.handleRemove()}
                    >
                <i className="fa fa-times" />
                삭제
              </Button>
            </span>
              )}
            </div>
          </div>
        </>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool
};

export default ImageUpload;
