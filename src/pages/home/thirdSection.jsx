import React, { useContext, useEffect, useState } from "react";
import img2 from "../../images/img2.png";
import { Context } from "../../context/context";
import { axiosInstance } from "../../utils/axiosIntance";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const ThirdSection = () => {
  const { dil } = useContext(Context);
  const [production, setProduction] = useState([]);
  useEffect(() => {
    getProductions();
  }, []);
  const getProductions = () => {
    axiosInstance
      .get("/api/production-section")
      .then((data) => {
        console.log(data.data);
        setProduction(data.data);
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
    <div className="w-full min-h-[346px] pt-24 pb-1 flex-col justify-start items-center gap-8 inline-flex">
      <div className="min-h-[246px] px-8 flex-col justify-start items-center gap-8 flex">
        <div className="min-h-[174px] flex-col justify-start items-center gap-6 flex">
          <div className="self-stretch text-center text-neutral-500 text-lg font-medium leading-normal">
            {production?.length > 0 &&
              production[0]?.contents?.map((item, index) => {
                return item[dil]?.name;
              })}
          </div>
          <div className="self-stretch text-center text-black md:text-5xl text-4xl font-semibold leading-[54px]">
            {production?.length > 0 &&
              production[0]?.contents?.map((item, index) => {
                return item[dil]?.title;
              })}
          </div>
          <div className="md:w-[480px] w-full text-center text-black text-opacity-50 md:text-lg text-[16px] font-normal leading-normal">
            {production?.length > 0 &&
              production[0]?.contents?.map((item, index) => {
                return htmlFrom(item[dil]?.description);
              })}
          </div>
        </div>
        {/* <div className="w-full justify-center items-start gap-4 inline-flex">
          <div className="md:w-[174px] w-full  h-[40px] px-4 bg-cyan-700 rounded-[10px] shadow justify-center items-center gap-2 flex">
            <div className="text-white whitespace-nowrap text-lg font-medium leading-normal">
              {production?.length > 0 &&
                production[0]?.contents?.map((item, index) => {
                  return item[dil]?.button;
                })}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ThirdSection;
