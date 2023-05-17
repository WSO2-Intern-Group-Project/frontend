import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplyAdddressComponent from "../Components/PublicUserComponents/ApplyAddressComponent";
import ApplyIdentityComponent from "../Components/PublicUserComponents/ApplyIdentityCertificate";
import Drawer from "../Components/PublicUserComponents/Drawer";
import HelpComponent from "../Components/PublicUserComponents/HelpComponent";
import HomeComponent from "../Components/PublicUserComponents/HomeComponent";
import MyRequestsComponent from "../Components/PublicUserComponents/MyRequestsComponnent";
import SignIn from "../pages/SignIn";
import GramaRequestsComponent from "../Components/GramasevakaComponents/GramaRequestsComponent";
import PersonalDataComponent from "../pages/PersonalDataComponent";
import { GramasewakaProtectedRoute } from "./GramasewakaProtectedRoute";
import { UserProtectedRoute } from "./UserProtectedRote";
import RoleSelect from "../Components/RoleSelect";
import GramasevakaDataComponent from "../pages/GramasevakaDataComponent";
import GSDrawer from "../Components/GramasevakaComponents/Drawer";

const ViewRoutes = () => {
  return (
    <Routes>
      <Route
        exact
        path={"user"}
        element={
          <UserProtectedRoute>
            <Drawer />
          </UserProtectedRoute>
        }
      >
        <Route index element={<HomeComponent />} />
        <Route path="myrequests" element={<MyRequestsComponent />} />
        <Route path="help" element={<HelpComponent />} />
        <Route path="applyAddress" element={<ApplyAdddressComponent />} />
        <Route path="applyIdentity" element={<ApplyIdentityComponent />} />
      </Route>
      <Route
        exact
        path={"gramasevaka"}
        element={
          <GramasewakaProtectedRoute>
            <GSDrawer />
          </GramasewakaProtectedRoute>
        }
      >
        <Route index element={<GramaRequestsComponent />} />
        <Route path="help" element={<HelpComponent />} />
      </Route>
      <Route path="/" element={<SignIn />} exact />
      <Route exact path={"/roleselect"} element={<RoleSelect />} />
      <Route path="/personalData" element={<PersonalDataComponent />} exact />
      <Route
        path="/gramasevakaData"
        element={<GramasevakaDataComponent />}
        exact
      />
    </Routes>
  );
};

export default ViewRoutes;
