import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/context";

import FirstSection from "../products/firstSection";
import SecondSection from "./secondSection";
import ThirdSection from "./thirdSection";
import FourthSection from "./fourthSection";

function Home(props) {
  const history = useHistory();
  const { dil } = useContext(Context);

  return (
    <div className="w-full pb-10 select-none">
      <div>
        <FirstSection />
      </div>
      <div className="w-full">
        <SecondSection />
      </div>
      <div className="w-full">
        <ThirdSection />
      </div>
      <div className="w-full mt-16">
        <FourthSection />
      </div>
    </div>
  );
}

export default Home;
