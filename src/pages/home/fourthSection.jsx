import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../context/context";
import { useHistory } from "react-router-dom";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useSizeComponents } from "../../components/sizeComponent";

const FourthSection = () => {
  const { dil } = useContext(Context);
  const history = useHistory();
  const [productions, setProduction] = useState([]);
  const [width, height] = useSizeComponents();
  useEffect(() => {
    getProduction();
  }, []);

  const getProduction = () => {
    axiosInstance
      .get("/api/productions")
      .then((data) => {
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
    <div className="w-full min-h-[1664px] flex-col justify-center items-center gap-16 inline-flex">
      {productions?.map((item, i) => {
        // let img = "";
        // item?.contents?.map((data) => {
        //   if (data["tm"]) {
        //     img = BASE_URL + data["tm"]?.images_for_web[0].src;
        //   }
        // });
        return i % 2 == 0 || width < 1024 ? (
          <div className="w-[90%]   lg:pr-8 bg-cyan-700   bg-opacity-5 rounded-[100px] justify-center items-center gap-[65px] lg:inline-flex block">
            <img
              className="object-cover  lg:w-1/2 w-full   lg:h-[512px] h-[256px] relative rounded-[50px]"
              src={BASE_URL + item?.contents[0]?.tm?.images_for_web[0].src}
            />
            <div className="lg:w-full lg:px-0 p-6 mx-auto lg:mt-0 mt-6 text-center grow shrink basis-0 flex-col justify-center items-center gap-8 inline-flex">
              <div className="min-h-[222px] flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch">
                  <span className="text-black text-4xl font-semibold leading-[42px]">
                    {item?.contents?.map((data) => {
                      return data[dil]?.title;
                    })}
                  </span>
                </div>
                <div className="self-stretch text-black lg:text-lg text-[16px] font-normal leading-normal">
                  {item?.contents?.map((data) => {
                    return htmlFrom(data[dil]?.description);
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-[90%] pl-8 bg-cyan-700 bg-opacity-5 rounded-[100px] justify-center items-center gap-8 lg:inline-flex hidden">
            <div className="grow shrink basis-0 flex-col justify-center items-center gap-[65px] inline-flex">
              <div className="h-[198px] flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch">
                  <span className="text-black text-4xl font-semibold leading-[42px]">
                    {item?.contents?.map((data) => {
                      return data[dil]?.title;
                    })}
                  </span>
                </div>
                <div className="self-stretch text-black text-lg font-normal leading-normal">
                  {item?.contents?.map((data) => {
                    return htmlFrom(data[dil]?.description);
                  })}
                </div>
              </div>
            </div>
            <img
              className="object-contain h-[512px] relative rounded-[50px]"
              src={BASE_URL + item?.contents[0]?.tm?.images_for_web[0].src}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FourthSection;
