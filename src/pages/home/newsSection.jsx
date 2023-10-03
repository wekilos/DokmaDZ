import React, { useContext, useEffect, useState } from "react";

import ic6 from "../../images/ic6.png";
import { Context } from "../../context/context";
import { useHistory } from "react-router-dom";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { useSizeComponents } from "../../components/sizeComponent";
import lang from "../../lang/home.json";

const NewsSection = () => {
  const { dil } = useContext(Context);
  const history = useHistory();
  const [news, setNews] = useState([]);
  const [width, height] = useSizeComponents();
  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    axiosInstance
      .get("/api/news")
      .then((data) => {
        setNews(data.data);
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
    <div className="w-full flex justify-center">
      <div className="w-[90%] min-h-[639px] md:pb-24 pb-12 flex-col justify-start items-center gap-5 inline-flex">
        <div className="self-stretch h-[139px] md:py-10 py8 flex-col justify-start items-center gap-8 flex">
          <div className="w-full md:px-8 px-0 justify-center items-center gap-5 inline-flex flex-wrap">
            <div className="w-12 h-12 rounded-full border border-black border-opacity-10 justify-center items-center gap-2 flex">
              <img src={ic6} className="w-12 h-12 relative" />
            </div>
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
              <div className="self-stretch text-black md:text-5xl text-4xl font-semibold">
                {lang[dil].news}
              </div>
            </div>
            <div className="justify-center md:w-[140px] w-full  items-start gap-4 flex">
              <div
                onClick={() => history.push({ pathname: "/news" })}
                className="md:w-[140px] w-full h-[40px] cursor-pointer px-4 bg-sky-900 rounded-[10px] shadow justify-center items-center gap-2 flex"
              >
                <div className="text-white text-lg font-medium leading-normal">
                  {lang[dil].allnews}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch min-h-96 flex-col justify-center items-center flex">
          <div className="w-full md:px-8 px-0 md:justify-start justify-center items-center gap-8 inline-flex flex-wrap">
            {news?.map((itm, i) => {
              return (width < 1000 ? i < 4 : i < 3) ? (
                <div
                  onClick={() => history.push({ pathname: "/news/" + itm?.id })}
                  key={"news" + i}
                  className="w-[31%] min-w-[300px] cursor-pointer lg:h-96 md2:h-[200px] md:h-[180px] h-[180px] relative"
                >
                  <img
                    className="w-full lg:h-96 md2:h-[200px] md:h-[180px] h-[180px]  object-cover left-0 top-0 absolute rounded-[10px]"
                    src={
                      itm?.contents[0]["tm"]?.images_for_web?.length > 0 &&
                      BASE_URL + itm?.contents[0]["tm"]?.images_for_web[0]?.src
                    }
                  />
                  <div className="w-full md:h-24 h-18 left-0 bottom-0 absolute bg-black bg-opacity-60 rounded-bl-[10px] rounded-br-[10px]" />
                  <div className="w-[347px] left-[16px] bottom-8 absolute text-white text-lg font-normal">
                    {itm?.contents?.map((item) => {
                      return item[dil]?.title;
                    })}
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
