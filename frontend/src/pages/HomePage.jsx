import React from "react";
import UserList from "../components/UserList";
import HoaxSubmit from "../components/HoaxSubmit";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-sm-12 mb-sm-3">
          <UserList />
        </div>
        <div className="col-md-8 col-sm-12">{isLoggedIn && <HoaxSubmit />}</div>
      </div>
    </div>
  );
};

export default HomePage;
