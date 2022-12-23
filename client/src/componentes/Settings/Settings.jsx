import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../redux/actions/actions";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser, getUserId } from "../../redux/actions/actions";
import { Navigate } from "react-router-dom";

import { useEffect } from "react";
import { NavBar } from "../NavBar/Navbar";

import { changeStatus, getUsers, setOnline } from "../../redux/actions/actions";
import { Profile } from "../Login/Profile";
export const Settings = () => {
  const { isAuthenticated, user } = useAuth0();
  const userOn = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: userOn.name,
    lastName: userOn.lastName,
    img: userOn.img,
    description: userOn.description,
    address: userOn.address,
    street: userOn.street,
    city: userOn.city,
    coordinates: userOn.coordinates,
  });
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user.sub);
      dispatch(getUserId(user.sub));
      console.log(userOn);
    }
  }, [dispatch, isAuthenticated]);
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const handleCancel = () => {
    window.location.replace(`/home`);
  };
  const handleSubmit = () => {
    console.log(input);
    dispatch(updateUser(input, userOn.id));
  };
  return (
    <div class="container">
      <div class="row gutters">
        <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div class="card h-100">
            <div class="card-body">
              <div class="account-settings">
                <div class="user-profile">
                  <div class="user-avatar">
                    <img
                      src={userOn.img}
                      alt="https://bootdey.com/img/Content/avatar/avatar1.png"
                    />
                  </div>
                  <h5 class="user-name">{userOn.name}</h5>
                  <h6 class="user-email">{userOn.email}</h6>
                </div>
                <div class="about">
                  <h5 class="mb-2 text-primary">About</h5>
                  <p>
                    I'm Yuki. Full Stack Designer I enjoy creating user-centric,
                    delightful and human experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div class="card h-100">
            <div class="card-body">
              <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 class="mb-3 text-primary">Personal Details</h6>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      placeholder={userOn.name}
                      name="name"
                      value={input.name}
                      /* defaultValue={user.phone}  */
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      placeholder={userOn.lastName}
                      name="lastName"
                      value={input.lastName}
                      /* defaultValue={user.phone}  */
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="eMail">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="eMail"
                      disabled
                      placeholder={userOn.email}
                      name="email"
                      value={input.email}
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="phone">Image</label>
                    <input
                      type="text"
                      class="form-control"
                      id="phone"
                      placeholder={userOn.img}
                      name="img"
                      value={input.img}
                      /* defaultValue={user.phone}  */
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="about">About You</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="description"
                      placeholder={userOn.description}
                      name="description"
                      value={input.description}
                      /* defaultValue={user.phone}  */
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 tittl">
                  <h6 class="mb-3 text-primary">Address</h6>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="Street">Street</label>
                    <input
                      type="name"
                      class="form-control"
                      id="Street"
                      placeholder={userOn.street}
                      name="street"
                      value={input.street}
                      /* defaultValue={user.phone}  */
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="address">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder={userOn.address}
                      name="address"
                      value={input.address}
                      /* defaultValue={user.phone}  */
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div class="form-group">
                    <label for="ciTy">City</label>
                    <input
                      type="name"
                      class="form-control"
                      id="ciTy"
                      placeholder={userOn.city}
                      name="city"
                      value={input.city}
                      /* defaultValue={user.phone}  */
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div class="row gutters">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="text-right tittl">
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      class="btn btn-secondary"
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      id="submit"
                      name="submit"
                      class="btn btn-primary"
                      onClick={() => handleSubmit()}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
