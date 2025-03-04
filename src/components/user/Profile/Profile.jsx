import React, { useContext } from "react";
import AppContext from "../../../context/AppContext";
import AllOrders from "../AllOrders/AllOrders";

const Profile = () => {
  const { user } = useContext(AppContext);

  return (
    <>
      <div className="container text-center my-3">
        <h1>Welcome, {user?.name}</h1>
        <h3>{user?.email}</h3>
      </div>
      <AllOrders />
    </>
  );
};

export default Profile;
