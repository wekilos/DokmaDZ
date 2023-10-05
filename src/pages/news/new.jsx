import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../../context/context";
import Navigation from "../../components/navigation";
import share from "../../images/share.png";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { BASE_URL, axiosInstance } from "../../utils/axiosIntance";
import lang from "../../lang/home.json";

import about from "../../images/about.png";
const New = () => {
  const { dil } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [news, setNews] = useState();

  useEffect(() => {
    getNews();
  }, []);

  const getNews = () => {
    axiosInstance
      .get("/api/news/" + id)
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

      <div className="w-full  flex-col justify-center items-center gap-8 inline-flex">
        <div className="w-[90%] px-8">
          <div className="block  ">
            <div className="w-full py-2  text-black text-3xl font-bold">
              {news?.contents?.map((item) => {
                return item[dil]?.title;
              })}
            </div>
            <div className="w-full py-2 justify-between items-start  inline-flex">
              <div className="text-black text-lg font-semibold">
                {news?.created_at?.slice(0, 10)}
              </div>
            </div>
            <div className=" w-full pb-12">
              <img
                className="w-full h-[400px] object-cover rounded-[12px] mt-4"
                src={BASE_URL + news?.contents[0]["tm"]?.images_for_web[0]?.src}
                // src={about}
              />
              <div className="w-[99%] pr-4 inline-flex flex-wrap  mt-8 text-gray-900 text-[22px] font-normal">
                {news?.contents?.map((item) => {
                  return htmlFrom(item[dil]?.description);
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
