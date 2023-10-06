import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/context";
import Navigation from "../../components/navigation";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import lang from "../../lang/home.json";
import about from "../../images/about.png";

const News = () => {
  const { dil } = useContext(Context);
  const history = useHistory();
  const [news, setNews] = useState([]);

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
    <div className="w-full">
      <Navigation path={lang[dil].news} />

      <div className="w-full bg-cyan-500 my-8 h-[242px] py-[94px] flex-col justify-start items-center gap-8 inline-flex">
        <div className="w-[1280px] px-8 justify-start items-center gap-8 inline-flex">
          <div className="w-[640px] flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch text-white text-5xl font-semibold leading-[54px]">
              {lang[dil].news}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto    min-h-[80vh] mb-12 justify-start gap-6  flex flex-wrap">
        {news?.map((item) => {
          return (
            <div
              onClick={() => history.push({ pathname: "/news/" + item?.id })}
              className="w-[32%] min-w-[300px] h-fit cursor-pointer my-4   shadow-md rounded-[12px] justify-start items-center gap-8 "
            >
              <img
                className="w-full h-[300px] rounded-[12px] object-cover mb-4  "
                src={BASE_URL + item?.contents[0]["tm"]?.images_for_web[0]?.src}
                // src={about}
              />

              <div className="w-full  min-h-[250px]  flex-col justify-start items-start gap-[18px] inline-flex">
                <div className="w-full px-4 text-black text-xl font-bold">
                  {item?.contents?.map((itm) => {
                    return itm[dil]?.title;
                  })}
                </div>
                <div className="w-full px-4 mb-4 line-clamp-4 text-gray-900 text-lg font-normal">
                  {item?.contents?.map((itm) => {
                    return htmlFrom(itm[dil]?.description);
                  })}
                </div>
              </div>
              <div className="w-full  px-4 h-[50px] bg-passive2 rounded-b-[12px] items-center  justify-start   gap-[108px] inline-flex">
                <div className="text-black whitespace-nowrap text-base font-semibold">
                  {item?.created_at?.slice(0, 10)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
