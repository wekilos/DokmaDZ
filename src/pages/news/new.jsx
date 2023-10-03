import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../../context/context";
import Navigation from "../../components/navigation";
import share from "../../images/share.png";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { BASE_URL2, axiosInstance } from "../../utils/axiosIntance";
import lang from "../../lang/home.json";

const New = () => {
  const { dil } = useContext(Context);
  const { id } = useParams();
  const history = useHistory();
  const [news, setNews] = useState({
    id: 4,
    contents: [
      {
        tm: {
          title: "news",
          description:
            "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>\r\n\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>",
          content:
            "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>\r\n\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>",
          images_for_web: [
            {
              src: "/uploads/images/kubarik_tanat_wV1Haok.png",
            },
          ],
          images_for_mobile: [
            {
              src: "/uploads/mobile-images/kubarik_tanat_Qbb0PTn.png",
            },
          ],
        },
      },
      {
        ru: {
          title: "news",
          description:
            "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
          content:
            "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
          images_for_web: [
            {
              src: "/uploads/images/kubarik_tanat_0QojJPY.png",
            },
          ],
          images_for_mobile: [
            {
              src: "/uploads/mobile-images/kubarik_tanat_P7QJcWw.png",
            },
          ],
        },
      },
      {
        eng: {
          title: "news",
          description:
            "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>",
          content:
            "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>",
          images_for_web: [
            {
              src: "/uploads/images/kubarik_tanat_OBHwXF1.png",
            },
          ],
          images_for_mobile: [
            {
              src: "/uploads/mobile-images/kubarik_tanat_dPSvjX7.png",
            },
          ],
        },
      },
    ],
    created_at: "2023-09-12T04:15:48.938609Z",
    updated_at: "2023-09-12T07:36:45.751330Z",
  });

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

      {/* <div className="w-full bg-[#0051CA] my-8 py-[94px] flex-col justify-start items-center gap-8 inline-flex">
        <div className="w-[90%] px-8 justify-start items-center gap-8 inline-flex">
          <div className="w-[640px] flex-col justify-start items-start gap-6 inline-flex">
            <div className="self-stretch text-white text-5xl font-semibold leading-[54px]">
              Türkmenistanyň prezidenti Özbegistan respublikasynyň prezidentini
              gutlady
            </div>
          </div>
        </div>
      </div> */}

      <div className="w-full  flex-col justify-center items-center gap-8 inline-flex">
        <div className="w-[90%] px-8">
          <div className="block  ">
            <div className="w-full py-8  text-black text-5xl font-bold">
              {news?.contents?.map((item) => {
                return item[dil]?.title;
              })}
            </div>
            <div className="w-full py-4 justify-between items-start  inline-flex">
              <div className="text-red-600 text-lg font-semibold">
                {news?.created_at?.slice(0, 10) +
                  " (" +
                  news?.created_at?.slice(11, 16) +
                  ")"}
              </div>
              <div className="justify-start items-center gap-[15px] flex">
                <img src={share} className="w-6 h-6 relative" />
                <div className="text-black text-lg font-normal">Paýlaşmak</div>
              </div>
            </div>
            <div className=" w-full pb-12">
              <img
                className="w-full object-contain"
                src={
                  BASE_URL2 + news?.contents[0]["tm"]?.images_for_web[0]?.src
                }
              />
              <div className="w-[99%] pr-4 inline-flex flex-wrap  mt-8 text-gray-900 text-[22px] font-normal">
                {news?.contents?.map((item) => {
                  return item[dil]?.content;
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
