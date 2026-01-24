// import React, { useState } from "react";
// import { toApiUrl } from "../_metronic/helpers";
// import logo from "../../src/_metronic/assets/sass/components/logoimage/logo.png";
// type editProps = {
//   currentImageUrl: string;
//   image: any;
//   setImage: (arg1: any) => void;
// };

// const ImageEdit = ({ currentImageUrl, image, setImage }: editProps) => {
//   const [displayImage, setDisplaymage] = useState<any>(null);

//   const onImageChange = (event: any) => {
//     if (event.target.files && event.target.files[0]) {
//       setDisplaymage(URL.createObjectURL(event.target.files[0]));
//       setImage(event.target.files[0]);
//     }
//   };
//   console.log("current url", currentImageUrl);
//   return (
//     <div className="row mb-12 row">
//       <label className="col-lg-4 col-form-label required fw-bold fs-6">
//         Image
//       </label>

//       <div className="col-lg-8">
//         <div className="row">
//           <div className="col-lg-12 fv-row">
//             {displayImage === null ? (
//               <div className="symbol symbol-45px me-5">
//                 <img src={toApiUrl(currentImageUrl)} alt="" />
//               </div>
//             ) : (
//               <div className="symbol symbol-45px me-5">
//                 <img src={logo} alt="" />
//               </div>
//             )}
//             <input type="file" onChange={onImageChange} className="filetype" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageEdit;
import React, { useState } from "react";
import { toApiUrl } from "../_metronic/helpers";
import logo from "../../src/_metronic/assets/sass/components/logoimage/logo.png";

type editProps = {
  currentImageUrl: string;
  image: any;
  setImage: (arg1: any) => void;
};

const ImageEdit = ({ currentImageUrl, image, setImage }: editProps) => {
  const [displayImage, setDisplaymage] = useState<any>(null);

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setDisplaymage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  // Check if the current image URL exists or fallback to the logo image
  const imageUrlToDisplay = displayImage 
    ? displayImage 
    : currentImageUrl 
    ? toApiUrl(currentImageUrl) 
    : logo;

  return (
    <div className="row mb-12 row">
      <label className="col-lg-4 col-form-label required fw-bold fs-6">
        Image
      </label>

      <div className="col-lg-8">
        <div className="row">
          <div className="col-lg-12 fv-row">
            <div className="symbol symbol-45px me-5">
              <img src={imageUrlToDisplay} alt="Product" />
            </div>
            <input type="file" onChange={onImageChange} className="filetype" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEdit;
