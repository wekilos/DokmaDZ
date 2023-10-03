import React, { useContext, useEffect, useState } from "react";

import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";
import { Context } from "../../context/context";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useHistory } from "react-router-dom";
import lang from "../../lang/home.json";

const SecondSection = () => {
  const [about, setAbout] = useState();
  const history = useHistory();
  const { dil } = useContext(Context);
  useEffect(() => {
    getAbout();
  }, []);
  const getAbout = () => {
    axiosInstance
      .get("/api/banner")
      .then((data) => {
        console.log(data.data);
        data.data?.length > 0 && setAbout(data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const htmlFrom = (htmlString) => {
    const cleanHtmlString = DOMPurify.sanitize(htmlString, {
      USE_PROFILES: { html: true },
    });
    const html = parse(cleanHtmlString);
    return html;
  };

  return (
    <div className="!w-full min-h-[100vh] pb-24 bg-cyan-700 bg-opacity-5 flex-col justify-center items-center gap-16 inline-flex">
      <div className="self-stretch   pt-24 pb-1 flex-col justify-start items-center gap-8 flex">
        <div className="  px-8 flex-col justify-start items-center gap-8 flex">
          <div className="self-stretch  flex-col justify-start items-center gap-6 flex">
            <div className="self-stretch text-center text-neutral-500 text-lg font-medium leading-normal">
              {about?.contents?.map((item, i) => {
                return item[dil]?.name;
              })}
            </div>
            <div className="self-stretch text-center text-black md:text-5xl text-4xl font-semibold leading-[54px]">
              {about?.contents?.map((item, i) => {
                return item[dil]?.title;
              })}
            </div>
            <div className="w-90 px-8 text-black text-opacity-50 md:text-lg text-[16px] font-normal leading-normal">
              {about?.contents?.map((item, i) => {
                return htmlFrom(item[dil]?.description);
              })}
            </div>
          </div>
          {/* <div className="w-full justify-center items-start gap-4 inline-flex">
            <div
              onClick={() => history.push({ pathname: about?.button_link })}
              className="md:w-[164px] w-full h-[40px] cursor-pointer px-4 bg-cyan-700 rounded-[10px] shadow justify-center items-center gap-2 flex"
            >
              <div className="text-white whitespace-nowrap text-lg font-medium leading-normal">
                {about?.contents?.map((item, i) => {
                  return item[dil]?.button;
                })}
              </div>
            </div>
          </div> */}
        </div>
      </div>
      
    </div>
  );
};

export default SecondSection;
