import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../context/context";
import lang from "../lang/home.json";
const Navigation = (props) => {
  const history = useHistory();
  const { dil, ChangeDil } = useContext(Context);
  return (
    <div className="w-[85%] mt-8 mx-auto text-black text-lg font-normal leading-normal">
      <span
        onClick={() => history.push({ pathname: "/home" })}
        className="text-lg cursor-pointer"
      >
        {lang[dil].home + " / "}
      </span>
      {props?.path}
    </div>
  );
};

export default Navigation;
