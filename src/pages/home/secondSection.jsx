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
        console.log("about", data.data);
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
            <div className="overflow-hidden text-center text-black text-opacity-50 md:text-lg text-[16px] font-normal leading-normal">
              {htmlFrom(lang[dil]?.aboutUsShort)}
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
      <div className="self-stretch min-h-[640px] flex-col justify-center items-center flex">
        <div className="w-full px-8 justify-center items-center gap-8 md2:inline-flex block">
          <div className="grow w-full shrink basis-0 self-stretch flex-col justify-center items-center gap-12 inline-flex">
            <div className="self-stretch min-h-[174px] flex-col justify-start items-center gap-4 flex">
              <div className="w-12 h-12 bg-zinc-100 rounded-full justify-center items-center gap-2 inline-flex">
                <img
                  src={about?.bannerchilds[0]?.icon[0]?.src}
                  className="w-6 h-6 relative"
                />
              </div>
              <div className="self-stretch text-center text-black text-xl font-medium leading-7">
                {about?.bannerchilds[0]?.contents?.map((item) => {
                  return item[dil]?.title;
                })}
              </div>
              <div className="self-stretch text-center text-black text-opacity-50 text-base font-normal leading-snug">
                {about?.bannerchilds[0]?.contents?.map((item) => {
                  return htmlFrom(item[dil]?.descriptioin);
                })}
              </div>
              <div className="text-center text-neutral-500 text-base font-medium leading-snug">
                {lang[dil]?.learn}
              </div>
            </div>
            <div className="self-stretch md2:pb-0 pb-4 min-h-[190px] flex-col justify-start items-center gap-4 flex">
              <div className="w-12 h-12 bg-zinc-100 rounded-full justify-center items-center gap-2 inline-flex">
                <img
                  src={about?.bannerchilds[1]?.icon[0]?.src}
                  className="w-6 h-6 relative"
                />
              </div>
              <div className="self-stretch text-center text-black text-xl font-medium leading-7">
                {about?.bannerchilds[1]?.contents?.map((item) => {
                  return item[dil]?.title;
                })}
              </div>
              <div className="self-stretch text-center text-black text-opacity-50 text-base font-normal leading-snug">
                {about?.bannerchilds[1]?.contents?.map((item) => {
                  return htmlFrom(item[dil]?.descriptioin);
                })}
              </div>
              <div className="text-center text-neutral-500 text-base font-medium leading-snug">
                {lang[dil]?.learn}
              </div>
            </div>
          </div>
          <img
            className="md2:w-96 object-cover w-full md2:h-[640px] h-[512px] relative rounded-[40px]"
            src={BASE_URL + Object.values(about?.contents[0]||{})[0]?.images_for_web[0]?.src}
          />
          <div className="grow shrink basis-0 self-stretch flex-col justify-center items-center gap-12 inline-flex">
            <div className="self-stretch md2:pt-0 pt-4 min-h-[190px] flex-col justify-start items-center gap-4 flex">
              <div className="w-12 h-12 bg-zinc-100 rounded-full justify-center items-center gap-2 inline-flex">
                <img
                  src={about?.bannerchilds[2]?.icon[0]?.src}
                  className="w-6 h-6 relative"
                />
              </div>
              <div className="self-stretch text-center text-black text-xl font-medium leading-7">
                {about?.bannerchilds[2]?.contents?.map((item) => {
                  return item[dil]?.title;
                })}
              </div>
              <div className="self-stretch text-center text-black text-opacity-50 text-base font-normal leading-snug">
                {about?.bannerchilds[2]?.contents?.map((item) => {
                  return htmlFrom(item[dil]?.descriptioin);
                })}
              </div>
              <div className="text-center text-neutral-500 text-base font-medium leading-snug">
                {lang[dil]?.learn}
              </div>
            </div>
            <div className="self-stretch min-h-[234px] flex-col justify-start items-center gap-4 flex">
              <div className="w-12 h-12 bg-zinc-100 rounded-full justify-center items-center gap-2 inline-flex">
                <img
                  src={about?.bannerchilds[3]?.icon[0]?.src}
                  className="w-6 h-6 relative"
                />
              </div>
              <div className="self-stretch text-center text-black text-xl font-medium leading-7">
                {about?.bannerchilds[3]?.contents?.map((item) => {
                  return item[dil]?.title;
                })}
              </div>
              <div className="self-stretch text-center text-black text-opacity-50 text-base font-normal leading-snug">
                {about?.bannerchilds[3]?.contents?.map((item) => {
                  return htmlFrom(item[dil]?.descriptioin);
                })}
              </div>
              <div className="text-center text-neutral-500 text-base font-medium leading-snug">
                {lang[dil]?.learn}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSection;
