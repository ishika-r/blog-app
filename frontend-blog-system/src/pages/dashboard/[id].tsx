import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { profileUser } from "../features/dashboard/profiledataSlice";
import {
  removeProfile,
  storeProfile,
  updateUser,
} from "../features/signup/signupSlice";
import { FaTrashAlt } from "react-icons/fa";
import Image from "next/image";
import { updateprofile } from "../features/dashboard/updateProfileApiSlice";

const Profile = () => {
  const router = useRouter();
  const id = router.query.id;
  console.log("id", id);
  const dispatch = useDispatch();
  // Get userinfromation api
  useEffect(() => {
    if (id) {
      dispatch(profileUser(id));
    }
    // dispatch(profileUser(id));
  }, [dispatch, id]);
  const apiData = useSelector(
    (state: any) => state.profileApi.data?.singleUserData
  );
  console.log("api data get user", apiData);
  const signUpdata = useSelector((state: any) => state.signup.signup);
  console.log("signupd data", signUpdata);

  useEffect(() => {
    if (apiData?.name !== undefined) {
      dispatch(updateUser<any>({ name: "name", value: apiData?.name }));
    }
    if (apiData?.mobile_number !== undefined) {
      dispatch(
        updateUser<any>({
          name: "mobile_number",
          value: apiData?.mobile_number,
        })
      );
    }
    if (apiData?.email !== undefined) {
      dispatch(updateUser<any>({ name: "email", value: apiData?.email }));
    }
    if (apiData?.profile !== undefined) {
      dispatch(storeProfile(apiData?.profile));
    }
    if (apiData?.password !== undefined) {
      dispatch(updateUser<any>({ name: "password", value: apiData?.password }));
    }
  }, [apiData]);
  const fileInputRef: any = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    // Handle the selected file as needed
    dispatch(storeProfile(selectedFile));
    // console.log(selectedFile);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(updateUser<any>({ name, value }));
  };
  const handleRemoveProfile = () => {
    dispatch(removeProfile());
  };
  const profile = signUpdata.profile;
  const isProfileUrl = typeof profile === "string";
  const profileImageUrl = isProfileUrl ? profile : URL.createObjectURL(profile);

  // Submit data
  // id as params, userData as payload, jwtToken as header
  const handleSubmit = () => {
    const formData: any = new FormData();
    formData.append("name", signUpdata.name);
    formData.append("mobile_number", signUpdata.mobile_number);
    formData.append("email", signUpdata.email);
    formData.append("password", signUpdata.password);
    formData.append("profile", signUpdata.profile);
    // To retreive form data
    for (var pair of formData.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    dispatch(updateprofile({ formData, id }));
    console.log("id from data", id);
  };
  return (
    <Layout>
      <div className="row text-center mt-5">
        <div className="col-lg-5 margin-col-5">
          <div className="card">
            <div className="card-body">
              {/* User name */}
              <h3 className="p-2">{signUpdata?.name}</h3>
              {/* Display Image */}
              {profile ? (
                <>
                  <img
                    src={profileImageUrl}
                    className="rounded-circle"
                    alt="Cinque Terre"
                    width="200"
                    height="200"
                  />
                  <span className="delete-image" onClick={handleRemoveProfile}>
                    <FaTrashAlt />
                  </span>
                </>
              ) : (
                <>
                  <Image src="/user.png" alt="me" width="200" height="200" />
                </>
              )}

              {/* Display add image */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/png, image/gif, image/jpeg"
                />
                <button onClick={handleButtonClick} className="btn btn-custom">
                  Upload Profile Picture
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="card card-edit-form">
            <div className="card-body">
              <h2>Edit Profile</h2>
              <hr />
              <div className="row mt-3">
                <div className="col-lg-3">
                  <label htmlFor="name" className="fw-bold">
                    Name
                  </label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={signUpdata?.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-lg-3">
                  <label htmlFor="mobile_number" className="fw-bold">
                    Mobile No.
                  </label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    name="mobile_number"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    value={signUpdata?.mobile_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-3">
                  <label htmlFor="email" className="fw-bold">
                    EMail
                  </label>
                </div>
                <div className="col-lg-9">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={signUpdata?.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <hr />
              <div className="submit-data">
                <button
                  onClick={handleSubmit}
                  className="btn btn-custom"
                  style={{ marginTop: "0 !important" }}
                >
                  Update Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
