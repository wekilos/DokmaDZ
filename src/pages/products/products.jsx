import React, { useContext, useEffect, useState } from "react";
import Navigation from "../../components/navigation";

import { Context } from "../../context/context";
import { useHistory } from "react-router-dom";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useSizeComponents } from "../../components/sizeComponent";

import lang from "../../lang/home.json";
import { Carousel } from "antd";
const Products = () => {
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
    <div>
      <Navigation path={lang[dil]?.production} />

      <div className="w-full min-h-[280px] md:pb-1 pb-6 md:pt-24 pt-12 flex-col justify-start items-center gap-8 inline-flex">
        <div className="min-h-[180px] px-8 flex-col justify-start items-center gap-8 flex">
          <div className="min-h-[180px] flex-col justify-start items-center gap-6 flex">
            <div className="self-stretch text-center text-black md:text-5xl text-4xl font-semibold leading-[54px]">
              {lang[dil]?.cotton}
            </div>
            <div className="md:w-[480px] w-full text-center text-black text-opacity-50 md:text-lg text-[16px] font-normal leading-normal">
              {lang[dil]?.cottonService}
            </div>
          </div>
        </div>
      </div>

      <div className="  w-[90%] mx-auto pb-10">
        <Carousel
          autoplay
          autoplaySpeed={3000}
          speed={5000}
          pauseOnHover
          dots={false}
        >
          {productions?.map((item, i) => {
            let img = "";
            item?.contents?.map((data) => {
              if (data[dil]) {
                img = BASE_URL + data[dil]?.images_for_web[0].src;
              }
            });
            return i % 2 == 0 || width < 1024 ? (
              <div className="block px-2">
                <div className="w-full   lg:pr-8 bg-cyan-700   bg-opacity-5 rounded-[100px] justify-center items-center gap-[65px] lg:inline-flex block">
                  <img
                    className="object-cover  lg:w-1/2 w-full   lg:h-[412px] h-[256px] relative rounded-[50px]"
                    src={img}
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
              </div>
            ) : (
              <div className="block px-2">
                <div className="w-full pl-8 bg-cyan-700 bg-opacity-5 rounded-[100px] justify-center items-center gap-8 lg:inline-flex hidden">
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
                    className="object-cover  lg:w-1/2 w-full   lg:h-[412px] h-[256px] relative rounded-[50px]"
                    src={img}
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Products;
