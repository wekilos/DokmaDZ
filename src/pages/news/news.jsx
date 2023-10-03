import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/context";
import Navigation from "../../components/navigation";
import { BASE_URL2, axiosInstance } from "../../utils/axiosIntance";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import lang from "../../lang/home.json";

const News = () => {
  const { dil } = useContext(Context);
  const history = useHistory();
  const [news, setNews] = useState([
    {
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
    },
    {
      id: 3,
      contents: [
        {
          tm: {
            title: "new",
            description:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>",
            content:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>",
            images_for_web: [
              {
                src: "/uploads/images/kubarik_tanat_Th2n4kM.png",
              },
            ],
            images_for_mobile: [
              {
                src: "/uploads/mobile-images/kubarik_tanat_FfzE8x8.png",
              },
            ],
          },
        },
        {
          ru: {
            title: "new",
            description:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            content:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>",
            images_for_web: [
              {
                src: "/uploads/images/kubarik_tanat_hrXXHCF.png",
              },
            ],
            images_for_mobile: [
              {
                src: "/uploads/mobile-images/kubarik_tanat_j6npjOa.png",
              },
            ],
          },
        },
        {
          eng: {
            title: "new",
            description:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            content:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            images_for_web: [
              {
                src: "/uploads/images/kubarik_tanat_hJ55Ji1.png",
              },
            ],
            images_for_mobile: [
              {
                src: "/uploads/mobile-images/kubarik_tanat_tGMQQIQ.png",
              },
            ],
          },
        },
      ],
      created_at: "2023-09-09T11:55:31.581239Z",
      updated_at: "2023-09-12T07:35:04.152275Z",
    },
    {
      id: 2,
      contents: [
        {
          tm: {
            title: "new",
            description:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            content:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            images_for_web: [
              {
                src: "/uploads/images/kubarik_tanat_re8kfvQ.png",
              },
            ],
            images_for_mobile: [
              {
                src: "/uploads/mobile-images/kubarik_tanat_Rs9AQAU.png",
              },
            ],
          },
        },
        {
          ru: {
            title: "new",
            description:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>",
            content:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            images_for_web: [
              {
                src: "/uploads/images/kubarik_tanat_ahWvlOM.png",
              },
            ],
            images_for_mobile: [
              {
                src: "/uploads/mobile-images/kubarik_tanat_tuogcZk.png",
              },
            ],
          },
        },
        {
          eng: {
            title: "new",
            description:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            content:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            images_for_web: [
              {
                src: "/uploads/images/kubarik_tanat_cm40Rc5.png",
              },
            ],
            images_for_mobile: [
              {
                src: "/uploads/mobile-images/kubarik_tanat_IVnBH7a.png",
              },
            ],
          },
        },
      ],
      created_at: "2023-09-09T11:54:11.863221Z",
      updated_at: "2023-09-12T07:33:43.519116Z",
    },
    {
      id: 1,
      contents: [
        {
          tm: {
            title: "new",
            description:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            content:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>",
            images_for_web: [
              {
                src: "/uploads/images/kubarik_tanat_M9VuYWh.png",
              },
            ],
            images_for_mobile: [
              {
                src: "/uploads/mobile-images/kubarik_tanat_PlU1J7u.png",
              },
            ],
          },
        },
        {
          ru: {
            title: "new",
            description:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            content:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            images_for_web: [
              {
                src: "/uploads/images/kubarik_tanat_s85G7EE.png",
              },
            ],
            images_for_mobile: [],
          },
        },
        {
          eng: {
            title: "new",
            description:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            content:
              "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p>",
            images_for_web: [
              {
                src: "/uploads/images/kubarik_tanat_3fhlQJW.png",
              },
            ],
            images_for_mobile: [
              {
                src: "/uploads/mobile-images/kubarik_tanat_qy36qmm.png",
              },
            ],
          },
        },
      ],
      created_at: "2023-09-09T10:21:14.793586Z",
      updated_at: "2023-09-12T07:32:38.813002Z",
    },
  ]);

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

      <div className="w-full    min-h-[80vh] mb-12 justify-center   flex flex-wrap">
        {news?.map((item) => {
          return (
            <div
              onClick={() => history.push({ pathname: "/news/" + item?.id })}
              className="w-[90%] cursor-pointer my-4 h-fit px-8 justify-start items-center gap-8 inline-flex"
            >
              <div className="w-[117px] min-h-[19px]  justify-start items-start gap-[108px] inline-flex">
                <div className="text-red-600 whitespace-nowrap text-base font-semibold">
                  {item?.created_at?.slice(0, 10) +
                    " (" +
                    item?.created_at?.slice(11, 16) +
                    ")"}
                </div>
              </div>
              <div className="w-[70%] min-h-[198px]  flex-col justify-start items-start gap-[18px] inline-flex">
                <div className="w-full text-black text-xl font-bold">
                  {item?.contents?.map((itm) => {
                    return itm[dil]?.title;
                  })}
                </div>
                <div className="w-[70%] line-clamp-5 text-gray-900 text-lg font-normal">
                  {item?.contents?.map((itm) => {
                    return itm[dil]?.description;
                  })}
                </div>
              </div>
              <img
                className="h-[200px]  object-contain  "
                src={
                  BASE_URL2 + item?.contents[0]["tm"]?.images_for_web[0]?.src
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
