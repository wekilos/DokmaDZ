import React, { useContext, useEffect, useRef, useState } from "react";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/context";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { Carousel } from "antd";
import lang from "../../lang/home.json";

const FirstSection = () => {
  const history = useHistory();
  const { dil } = useContext(Context);
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getSlider();
  }, []);


  const getSlider = () => {
    axiosInstance
      .get("/api/video-section")
      .then((data) => {
        console.log("production slider", data.data);
        setSlider(data.data?.length > 0 && data.data[0]);
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
    <div className="w-full   md:py-12 py-6 justify-center items-center gap-8 inline-flex">
      <div className="w-[90%]  justify-center items-center gap-8 flex flex-wrap">
        <div className="grow md:w-1/2 w-full shrink basis-0 md:py-12 py-0 flex-col justify-center items-start gap-16 inline-flex">
          <div className="self-stretch w-full h-[298px] flex-col md:justify-start justify-center  items-start gap-8 flex">
            <div className="self-stretch h-[298px] flex-col md:justify-start justify-center  items-start gap-6 flex">
              <div className="self-stretch w-full text-black md:text-left text-center  md:text-5xl text-4xl font-semibold leading-[54px]">
                {lang[dil]?.cotton}
              </div>
              <div className="w-full text-black md:text-lg md:text-left text-center  text-[16px] font-normal leading-normal">
                {lang[dil]?.cottonService}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <Carousel autoplay dots={false}>
            { slider?.thumbnail?.map((item, i) => {
                console.log(item.src);
                return (
                  <div
                    className="grow shrink basis-0 self-stretch flex-col justify-center items-end gap-12 inline-flex"
                    key={"slider" + i}
                  >
                    <img
                      className="w-[592px] relative rounded-tr-[128px] rounded-bl-[128px]"
                      src={item.src}
                      alt="slider"
                    />
                  </div>
                );
              })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default FirstSection;
