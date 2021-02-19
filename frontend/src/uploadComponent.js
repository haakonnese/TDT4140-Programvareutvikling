import React, { useState } from "react";
import ImageUploader from "react-images-upload";


const UploadComponent = (props) => (
    <form>
      <ImageUploader
        key="image-uploader"
        withIcon={true}
        singleImage={true}
        withPreview={true}
        label="Maximum size file: 5MB"
        buttonText="Choose an image"
        imgExtension={[".jpg", ".png", ".jpeg"]}
        maxFileSize={5242880}
      ></ImageUploader>
    </form>
  );
  