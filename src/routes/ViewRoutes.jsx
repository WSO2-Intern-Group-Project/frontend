import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplyAdddressComponent from "../Components/PublicUserComponents/ApplyAddressComponent";
import ApplyIdentityComponent from "../Components/PublicUserComponents/ApplyIdentityCertificate";
import Drawer from "../Components/PublicUserComponents/Drawer";
import HelpComponent from "../Components/PublicUserComponents/HelpComponent";
import HomeComponent from "../Components/PublicUserComponents/HomeComponent";
import MyRequestsComponent from "../Components/PublicUserComponents/MyRequestsComponnent";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import RoleSelectPage from "../pages/RoleSelectPage";
import GramaRequestsComponent from "../Components/GramasevakaComponents/GramaRequestsComponent";
import PersonalDataComponent from "../pages/PersonalDataComponent";

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
        <Route path="help" element={<HelpComponent />} />
        <Route path="applyAddress" element={<ApplyAdddressComponent />} />
        <Route path="applyIdentity" element={<ApplyIdentityComponent />} />
      </Route>
      <Route exact path={"gramasevaka"} element={<Drawer />}>
        <Route path="myrequests" element={<GramaRequestsComponent />} />
        <Route path="help" element={<HelpComponent />} />
      </Route>
      <Route path="/signin" element={<SignIn />} exact />
      <Route path="/signup" element={<SignUp />} exact />
      <Route path="/personalData" element={<PersonalDataComponent />} exact />
      <Route path="/role-select" element={<RoleSelectPage />} exact />
    </Routes>
  );
};

export default ViewRoutes;
