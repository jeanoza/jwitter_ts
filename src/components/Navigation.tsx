import React from "react";
import { Link } from "react-router-dom";
interface IProps {
  userObj: object | null;
}

const Navigation = ({ userObj }: IProps) => {
  console.log(userObj);
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </>
  );
};

export default Navigation;
