import React from "react"
import {Icon, Uploader} from "rsuite";

const PictureUpload = () => (
  <Uploader multiple listType="picture" action="//jsonplaceholder.typicode.com/posts/">
    <button>
      <Icon icon='camera-retro' size="lg" />
    </button>
  </Uploader>
);

export default PictureUpload;