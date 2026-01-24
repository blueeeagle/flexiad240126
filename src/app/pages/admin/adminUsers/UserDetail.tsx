// import { FC, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// // import * as Yup from 'yup';
// // import {useFormik} from 'formik';

// const AdminUserDetail: FC = () => {
//   const [loading, setLoading] = useState(false);

//   return (
//     <>
//       <PageTitle>ADD/UPDATE USERS</PageTitle>

//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-body py-3">
//             <form noValidate className="form">
//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   First Name
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="text"
//                         className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
//                         placeholder="Enter First Name"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Last Name
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="text"
//                         className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
//                         placeholder="Enter Last Name"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Email
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="email"
//                         className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
//                         placeholder="Enter Email"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Username
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="text"
//                         className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
//                         placeholder="Enter Username"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Role
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <select className="form-select form-select-solid form-select-lg fw-bold">
//                         <option value="">Select a Role...</option>
//                         <option value="AF">Role1</option>
//                         <option value="AX">Role2</option>
//                         <option value="AL">Role3</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label fw-bold fs-6">
//                   Profile Picture
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="file"
//                         className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
//                         placeholder="Enter Username"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Country
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <select className="form-select form-select-solid form-select-lg fw-bold">
//                         <option value="">Select a Country...</option>
//                         <option value="AF">Afghanistan</option>
//                         <option value="AX">Aland Islands</option>
//                         <option value="AL">Albania</option>
//                         <option value="DZ">Algeria</option>
//                         <option value="AS">American Samoa</option>
//                         <option value="AD">Andorra</option>
//                         <option value="AO">Angola</option>
//                         <option value="AI">Anguilla</option>
//                         <option value="AQ">Antarctica</option>
//                         <option value="AG">Antigua and Barbuda</option>
//                         <option value="AR">Argentina</option>
//                         <option value="AM">Armenia</option>
//                         <option value="AW">Aruba</option>
//                         <option value="AU">Australia</option>
//                         <option value="AT">Austria</option>
//                         <option value="AZ">Azerbaijan</option>
//                         <option value="BS">Bahamas</option>
//                         <option value="BH">Bahrain</option>
//                         <option value="BD">Bangladesh</option>
//                         <option value="BB">Barbados</option>
//                         <option value="BY">Belarus</option>
//                         <option value="BE">Belgium</option>
//                         <option value="BZ">Belize</option>
//                         <option value="BJ">Benin</option>
//                         <option value="BM">Bermuda</option>
//                         <option value="BT">Bhutan</option>
//                         <option value="BO">
//                           Bolivia, Plurinational State of
//                         </option>
//                         <option value="BQ">
//                           Bonaire, Sint Eustatius and Saba
//                         </option>
//                         <option value="BA">Bosnia and Herzegovina</option>
//                         <option value="BW">Botswana</option>
//                         <option value="BV">Bouvet Island</option>
//                         <option value="BR">Brazil</option>
//                         <option value="IO">
//                           British Indian Ocean Territory
//                         </option>
//                         <option value="BN">Brunei Darussalam</option>
//                         <option value="BG">Bulgaria</option>
//                         <option value="BF">Burkina Faso</option>
//                         <option value="BI">Burundi</option>
//                         <option value="KH">Cambodia</option>
//                         <option value="CM">Cameroon</option>
//                         <option value="CA">Canada</option>
//                         <option value="CV">Cape Verde</option>
//                         <option value="KY">Cayman Islands</option>
//                         <option value="CF">Central African Republic</option>
//                         <option value="TD">Chad</option>
//                         <option value="CL">Chile</option>
//                         <option value="CN">China</option>
//                         <option value="CX">Christmas Island</option>
//                         <option value="CC">Cocos (Keeling) Islands</option>
//                         <option value="CO">Colombia</option>
//                         <option value="KM">Comoros</option>
//                         <option value="CG">Congo</option>
//                         <option value="CD">
//                           Congo, the Democratic Republic of the
//                         </option>
//                         <option value="CK">Cook Islands</option>
//                         <option value="CR">Costa Rica</option>
//                         <option value="CI">Côte d'Ivoire</option>
//                         <option value="HR">Croatia</option>
//                         <option value="CU">Cuba</option>
//                         <option value="CW">Curaçao</option>
//                         <option value="CY">Cyprus</option>
//                         <option value="CZ">Czech Republic</option>
//                         <option value="DK">Denmark</option>
//                         <option value="DJ">Djibouti</option>
//                         <option value="DM">Dominica</option>
//                         <option value="DO">Dominican Republic</option>
//                         <option value="EC">Ecuador</option>
//                         <option value="EG">Egypt</option>
//                         <option value="SV">El Salvador</option>
//                         <option value="GQ">Equatorial Guinea</option>
//                         <option value="ER">Eritrea</option>
//                         <option value="EE">Estonia</option>
//                         <option value="ET">Ethiopia</option>
//                         <option value="FK">Falkland Islands (Malvinas)</option>
//                         <option value="FO">Faroe Islands</option>
//                         <option value="FJ">Fiji</option>
//                         <option value="FI">Finland</option>
//                         <option value="FR">France</option>
//                         <option value="GF">French Guiana</option>
//                         <option value="PF">French Polynesia</option>
//                         <option value="TF">French Southern Territories</option>
//                         <option value="GA">Gabon</option>
//                         <option value="GM">Gambia</option>
//                         <option value="GE">Georgia</option>
//                         <option value="DE">Germany</option>
//                         <option value="GH">Ghana</option>
//                         <option value="GI">Gibraltar</option>
//                         <option value="GR">Greece</option>
//                         <option value="GL">Greenland</option>
//                         <option value="GD">Grenada</option>
//                         <option value="GP">Guadeloupe</option>
//                         <option value="GU">Guam</option>
//                         <option value="GT">Guatemala</option>
//                         <option value="GG">Guernsey</option>
//                         <option value="GN">Guinea</option>
//                         <option value="GW">Guinea-Bissau</option>
//                         <option value="GY">Guyana</option>
//                         <option value="HT">Haiti</option>
//                         <option value="HM">
//                           Heard Island and McDonald Islands
//                         </option>
//                         <option value="VA">
//                           Holy See (Vatican City State)
//                         </option>
//                         <option value="HN">Honduras</option>
//                         <option value="HK">Hong Kong</option>
//                         <option value="HU">Hungary</option>
//                         <option value="IS">Iceland</option>
//                         <option value="IN">India</option>
//                         <option value="ID">Indonesia</option>
//                         <option value="IR">Iran, Islamic Republic of</option>
//                         <option value="IQ">Iraq</option>
//                         <option value="IE">Ireland</option>
//                         <option value="IM">Isle of Man</option>
//                         <option value="IL">Israel</option>
//                         <option value="IT">Italy</option>
//                         <option value="JM">Jamaica</option>
//                         <option value="JP">Japan</option>
//                         <option value="JE">Jersey</option>
//                         <option value="JO">Jordan</option>
//                         <option value="KZ">Kazakhstan</option>
//                         <option value="KE">Kenya</option>
//                         <option value="KI">Kiribati</option>
//                         <option value="KP">
//                           Korea, Democratic People's Republic of
//                         </option>
//                         <option value="KW">Kuwait</option>
//                         <option value="KG">Kyrgyzstan</option>
//                         <option value="LA">
//                           Lao People's Democratic Republic
//                         </option>
//                         <option value="LV">Latvia</option>
//                         <option value="LB">Lebanon</option>
//                         <option value="LS">Lesotho</option>
//                         <option value="LR">Liberia</option>
//                         <option value="LY">Libya</option>
//                         <option value="LI">Liechtenstein</option>
//                         <option value="LT">Lithuania</option>
//                         <option value="LU">Luxembourg</option>
//                         <option value="MO">Macao</option>
//                         <option value="MK">
//                           Macedonia, the former Yugoslav Republic of
//                         </option>
//                         <option value="MG">Madagascar</option>
//                         <option value="MW">Malawi</option>
//                         <option value="MY">Malaysia</option>
//                         <option value="MV">Maldives</option>
//                         <option value="ML">Mali</option>
//                         <option value="MT">Malta</option>
//                         <option value="MH">Marshall Islands</option>
//                         <option value="MQ">Martinique</option>
//                         <option value="MR">Mauritania</option>
//                         <option value="MU">Mauritius</option>
//                         <option value="YT">Mayotte</option>
//                         <option value="MX">Mexico</option>
//                         <option value="FM">
//                           Micronesia, Federated States of
//                         </option>
//                         <option value="MD">Moldova, Republic of</option>
//                         <option value="MC">Monaco</option>
//                         <option value="MN">Mongolia</option>
//                         <option value="ME">Montenegro</option>
//                         <option value="MS">Montserrat</option>
//                         <option value="MA">Morocco</option>
//                         <option value="MZ">Mozambique</option>
//                         <option value="MM">Myanmar</option>
//                         <option value="NA">Namibia</option>
//                         <option value="NR">Nauru</option>
//                         <option value="NP">Nepal</option>
//                         <option value="NL">Netherlands</option>
//                         <option value="NC">New Caledonia</option>
//                         <option value="NZ">New Zealand</option>
//                         <option value="NI">Nicaragua</option>
//                         <option value="NE">Niger</option>
//                         <option value="NG">Nigeria</option>
//                         <option value="NU">Niue</option>
//                         <option value="NF">Norfolk Island</option>
//                         <option value="MP">Northern Mariana Islands</option>
//                         <option value="NO">Norway</option>
//                         <option value="OM">Oman</option>
//                         <option value="PK">Pakistan</option>
//                         <option value="PW">Palau</option>
//                         <option value="PS">
//                           Palestinian Territory, Occupied
//                         </option>
//                         <option value="PA">Panama</option>
//                         <option value="PG">Papua New Guinea</option>
//                         <option value="PY">Paraguay</option>
//                         <option value="PE">Peru</option>
//                         <option value="PH">Philippines</option>
//                         <option value="PN">Pitcairn</option>
//                         <option value="PL">Poland</option>
//                         <option value="PT">Portugal</option>
//                         <option value="PR">Puerto Rico</option>
//                         <option value="QA">Qatar</option>
//                         <option value="RE">Réunion</option>
//                         <option value="RO">Romania</option>
//                         <option value="RU">Russian Federation</option>
//                         <option value="RW">Rwanda</option>
//                         <option value="BL">Saint Barthélemy</option>
//                         <option value="SH">
//                           Saint Helena, Ascension and Tristan da Cunha
//                         </option>
//                         <option value="KN">Saint Kitts and Nevis</option>
//                         <option value="LC">Saint Lucia</option>
//                         <option value="MF">Saint Martin (French part)</option>
//                         <option value="PM">Saint Pierre and Miquelon</option>
//                         <option value="VC">
//                           Saint Vincent and the Grenadines
//                         </option>
//                         <option value="WS">Samoa</option>
//                         <option value="SM">San Marino</option>
//                         <option value="ST">Sao Tome and Principe</option>
//                         <option value="SA">Saudi Arabia</option>
//                         <option value="SN">Senegal</option>
//                         <option value="RS">Serbia</option>
//                         <option value="SC">Seychelles</option>
//                         <option value="SL">Sierra Leone</option>
//                         <option value="SG">Singapore</option>
//                         <option value="SX">Sint Maarten (Dutch part)</option>
//                         <option value="SK">Slovakia</option>
//                         <option value="SI">Slovenia</option>
//                         <option value="SB">Solomon Islands</option>
//                         <option value="SO">Somalia</option>
//                         <option value="ZA">South Africa</option>
//                         <option value="GS">
//                           South Georgia and the South Sandwich Islands
//                         </option>
//                         <option value="KR">South Korea</option>
//                         <option value="SS">South Sudan</option>
//                         <option value="ES">Spain</option>
//                         <option value="LK">Sri Lanka</option>
//                         <option value="SD">Sudan</option>
//                         <option value="SR">Suriname</option>
//                         <option value="SJ">Svalbard and Jan Mayen</option>
//                         <option value="SZ">Swaziland</option>
//                         <option value="SE">Sweden</option>
//                         <option value="CH">Switzerland</option>
//                         <option value="SY">Syrian Arab Republic</option>
//                         <option value="TW">Taiwan, Province of China</option>
//                         <option value="TJ">Tajikistan</option>
//                         <option value="TZ">Tanzania, United Republic of</option>
//                         <option value="TH">Thailand</option>
//                         <option value="TL">Timor-Leste</option>
//                         <option value="TG">Togo</option>
//                         <option value="TK">Tokelau</option>
//                         <option value="TO">Tonga</option>
//                         <option value="TT">Trinidad and Tobago</option>
//                         <option value="TN">Tunisia</option>
//                         <option value="TR">Turkey</option>
//                         <option value="TM">Turkmenistan</option>
//                         <option value="TC">Turks and Caicos Islands</option>
//                         <option value="TV">Tuvalu</option>
//                         <option value="UG">Uganda</option>
//                         <option value="UA">Ukraine</option>
//                         <option value="AE">United Arab Emirates</option>
//                         <option value="GB">United Kingdom</option>
//                         <option value="US">United States</option>
//                         <option value="UY">Uruguay</option>
//                         <option value="UZ">Uzbekistan</option>
//                         <option value="VU">Vanuatu</option>
//                         <option value="VE">
//                           Venezuela, Bolivarian Republic of
//                         </option>
//                         <option value="VN">Vietnam</option>
//                         <option value="VI">Virgin Islands</option>
//                         <option value="WF">Wallis and Futuna</option>
//                         <option value="EH">Western Sahara</option>
//                         <option value="YE">Yemen</option>
//                         <option value="ZM">Zambia</option>
//                         <option value="ZW">Zimbabwe</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label fw-bold fs-6">
//                   State
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <select className="form-select form-select-solid form-select-lg fw-bold">
//                         <option value="">Select a State...</option>
//                         <option value="AF">State1</option>
//                         <option value="AX">State2</option>
//                         <option value="AL">State3</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   City
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <select className="form-select form-select-solid form-select-lg fw-bold">
//                         <option value="">Select a City...</option>
//                         <option value="AF">City1</option>
//                         <option value="AX">City2</option>
//                         <option value="AL">City3</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Zipcode
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="text"
//                         className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
//                         placeholder="Enter Zipcode"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label fw-bold fs-6">
//                   Mobile Number
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="text"
//                         className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
//                         placeholder="Enter Mobile Number"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="card-footer d-flex justify-content-end py-6 px-9">
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={loading}
//                 >
//                   {!loading && "Save Changes"}
//                   {loading && (
//                     <span
//                       className="indicator-progress"
//                       style={{ display: "block" }}
//                     >
//                       Please wait...{" "}
//                       <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminUserDetail;
import { FC, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";

const AdminUserDetail: FC = () => {
    const [formData, setFormData] = useState<{
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        role: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobileNumber: string;
        profilePicture: File | null; // Update the type here
      }>({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        role: "",
        country: "",
        state: "",
        city: "",
        zipcode: "",
        mobileNumber: "",
        profilePicture: null, // initial value is null
      });
      
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change for profile picture
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0], // store the binary file
      });
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("state", formData.state);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("zipcode", formData.zipcode);
    formDataToSend.append("mobileNumber", formData.mobileNumber);
  
    // Append profile picture as a binary file
    if (formData.profilePicture) {
      formDataToSend.append("profilePicture", formData.profilePicture);
    }
  
    try {
        const token = localStorage.getItem("token");
  
      const response = await fetch("https://adminapi.flexiclean.me/api/v1/admin/user", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("User added/updated successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error adding/updating user:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <PageTitle>ADD/UPDATE USERS</PageTitle>

      <div className="row g-5 g-xl-8">
        <div className={`card `}>
          <div className="card-body py-3">
            <form noValidate className="form" onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">First Name</label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">Last Name</label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">Email</label>
                <div className="col-lg-8">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Username */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">Username</label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    name="username"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Role */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">Role</label>
                <div className="col-lg-8">
                  <select
                    name="role"
                    className="form-select form-select-solid form-select-lg fw-bold"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="">Select a Role...</option>
                    <option value="Role1">Role1</option>
                    <option value="Role2">Role2</option>
                    <option value="Role3">Role3</option>
                  </select>
                </div>
              </div>

              {/* Profile Picture */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">Profile Picture</label>
                <div className="col-lg-8">
                  <input
                    type="file"
                    name="profilePicture"
                    className="form-control form-control-lg form-control-solid"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {/* Country */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">Country</label>
                <div className="col-lg-8">
                <select className="form-select form-select-solid form-select-lg fw-bold">
                        <option value="">Select a Country...</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AX">Aland Islands</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">
                          Bolivia, Plurinational State of
                        </option>
                        <option value="BQ">
                          Bonaire, Sint Eustatius and Saba
                        </option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BV">Bouvet Island</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">
                          British Indian Ocean Territory
                        </option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CV">Cape Verde</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CD">
                          Congo, the Democratic Republic of the
                        </option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Côte d'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CW">Curaçao</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FK">Falkland Islands (Malvinas)</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="TF">French Southern Territories</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GG">Guernsey</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HM">
                          Heard Island and McDonald Islands
                        </option>
                        <option value="VA">
                          Holy See (Vatican City State)
                        </option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran, Islamic Republic of</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JE">Jersey</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KP">
                          Korea, Democratic People's Republic of
                        </option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">
                          Lao People's Democratic Republic
                        </option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macao</option>
                        <option value="MK">
                          Macedonia, the former Yugoslav Republic of
                        </option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MQ">Martinique</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="YT">Mayotte</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">
                          Micronesia, Federated States of
                        </option>
                        <option value="MD">Moldova, Republic of</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MS">Montserrat</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="NU">Niue</option>
                        <option value="NF">Norfolk Island</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau</option>
                        <option value="PS">
                          Palestinian Territory, Occupied
                        </option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PN">Pitcairn</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="QA">Qatar</option>
                        <option value="RE">Réunion</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russian Federation</option>
                        <option value="RW">Rwanda</option>
                        <option value="BL">Saint Barthélemy</option>
                        <option value="SH">
                          Saint Helena, Ascension and Tristan da Cunha
                        </option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="MF">Saint Martin (French part)</option>
                        <option value="PM">Saint Pierre and Miquelon</option>
                        <option value="VC">
                          Saint Vincent and the Grenadines
                        </option>
                        <option value="WS">Samoa</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SX">Sint Maarten (Dutch part)</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="GS">
                          South Georgia and the South Sandwich Islands
                        </option>
                        <option value="KR">South Korea</option>
                        <option value="SS">South Sudan</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SJ">Svalbard and Jan Mayen</option>
                        <option value="SZ">Swaziland</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syrian Arab Republic</option>
                        <option value="TW">Taiwan, Province of China</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania, United Republic of</option>
                        <option value="TH">Thailand</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TG">Togo</option>
                        <option value="TK">Tokelau</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TC">Turks and Caicos Islands</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VE">
                          Venezuela, Bolivarian Republic of
                        </option>
                        <option value="VN">Vietnam</option>
                        <option value="VI">Virgin Islands</option>
                        <option value="WF">Wallis and Futuna</option>
                        <option value="EH">Western Sahara</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                      </select>
                </div>
              </div>

              {/* State */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">State</label>
                <div className="col-lg-8">
                  <select
                    name="state"
                    className="form-select form-select-solid form-select-lg fw-bold"
                    value={formData.state}
                    onChange={handleChange}
                  >
                    <option value="">Select a State...</option>
                    <option value="State1">State1</option>
                    <option value="State2">State2</option>
                    {/* Add other states as needed */}
                  </select>
                </div>
              </div>

              {/* City */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">City</label>
                <div className="col-lg-8">
                  <select
                    name="city"
                    className="form-select form-select-solid form-select-lg fw-bold"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="">Select a City...</option>
                    <option value="City1">City1</option>
                    <option value="City2">City2</option>
                    {/* Add other cities as needed */}
                  </select>
                </div>
              </div>

              {/* Zipcode */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">Zipcode</label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    name="zipcode"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">Mobile Number</label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    name="mobileNumber"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="row mb-12">
                <div className="col-lg-8 offset-lg-4">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserDetail;
