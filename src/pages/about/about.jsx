import React, { useContext, useEffect, useState } from "react";
import Navigation from "../../components/navigation";
import SecondSection from "./secondSection";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";
import { Context } from "../../context/context";
import { useHistory } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { Carousel } from "antd";
import lang from "../../lang/home.json";

import play from "../../images/play.png";

const About = () => {
  const { dil } = useContext(Context);
  const history = useHistory();
  const [videoSection, setVideoSection] = useState();
  const [statistics, setStatistics] = useState([]);
  const [count, setCount] = useState(0);
  let a = 1;
  useEffect(() => {
    getVideoSection();
    getStatistics();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      return setCount(count + 1);
    }, 300);
  }, [count]);

  const getVideoSection = () => {
    axiosInstance
      .get("/api/video-section")
      .then((data) => {
        console.log("video", data.data);
        data.data?.length > 0 && setVideoSection(data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStatistics = () => {
    axiosInstance
      .get("/api/statistics")
      .then((data) => {
        setStatistics(data.data);
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
      <Navigation path={lang[dil].about} />
      <div className="w-full   pb-24 rounded-[100px] flex-col justify-center items-center gap-16 inline-flex">
        <div className="self-stretch h-[20px] py-10 flex-col justify-start items-center gap-8 flex">
          <div className="h-[126px] px-8 flex-col justify-start items-center gap-8 flex">
            <div className="h-[126px] flex-col justify-start items-center gap-6 flex">
              <div className="self-stretch text-center text-black md2:text-5xl text-4xl font-semibold leading-[54px]">
                {videoSection?.contents?.map((item) => {
                  console.log("video", item[dil])
                  return item[dil]?.title;
                })}
              </div>
              {/* <div className="w-[480px] text-center text-black text-opacity-50 text-lg font-normal leading-normal">
                {lang[dil]}
              </div> */}
            </div>
          </div>
        </div>
        <div className="self-stretch h-auto flex-col justify-center items-center   flex">
          <div
            className=" w-[70%]"
          >
            
            <Carousel autoplay dots={false} autoplaySpeed={3000} focusOnSelect={false} pauseOnHover={false}>
              {videoSection?.thumbnail?.map((item, i) => {
                console.log(BASE_URL + item.src);
                return (
                  <div
                    key={"sli" + i}
                    className="w-full h-auto  relative rounded-[30px] shadow "
                  >
                    <img
                      src={item?.src}
                      className="w-full h-full z-10 rounded-[30px] object-cover"
                      alt="about video"
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
        <div className="self-stretch    flex-col justify-center items-center md2:flex hidden flex-wrap">
          <div className="w-[90%] px-8 justify-center items-baseline gap-8 inline-flex">
            {statistics?.map((item, i) => {
              return (
                <div
                  key={"statistics" + i}
                  className="grow shrink basis-0 flex-col justify-start items-center gap-4 inline-flex"
                >
                  <div className="self-stretch text-center text-black text-[40px] font-bold leading-7">
                    {count < item?.number ? count : item?.number}
                  </div>
                  <div className="self-stretch text-center text-black text-opacity-50 text-base font-normal leading-snug">
                    {item?.contents?.map((itm) => {
                      return htmlFrom(itm[dil]?.descriptioin);
                    })}
                  </div>
                  {/* <div className="text-center text-neutral-500 text-base font-medium leading-snug">
                    Learn more
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div id="description">
        <SecondSection />
      </div>
    </div>
  );
};

export default About;
