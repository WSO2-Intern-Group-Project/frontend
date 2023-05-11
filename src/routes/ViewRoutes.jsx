import React from "react";
import { Route, Routes } from "react-router-dom";
import Drawer from "../Components/PublicUserComponents/Drawer";
import HomeComponent from "../Components/PublicUserComponents/HomeComponent";
import MyRequestsComponent from "../Components/PublicUserComponents/MyRequestsComponnent";

const ViewRoutes = () => {
  return (
    <Routes>
      {/* 
      <Route exact path={LOGIN} element={<LoginComponent />} />
      <Route exact path={SIGNUP} element={<SignUp />} /> */}
      <Route exact path={"/"} element={<Drawer />} />
      <Route exact path={"user"} element={<Drawer />}>
        <Route index element={<HomeComponent />} />
        <Route path="myrequests" element={<MyRequestsComponent />} />
      </Route>
    </Routes>
  );
};

export default ViewRoutes;
