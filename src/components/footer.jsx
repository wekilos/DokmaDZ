import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../context/context";
import { axiosInstance } from "../utils/axiosIntance";
import mail from "../images/mail.svg";
import logo from "../images/logo.svg";
import lang from "../lang/home.json";
const Footer = () => {
  const history = useHistory();
  const { dil } = useContext(Context);
  const [navbars, setNavbars] = useState([]);
  const [footers, setFooters] = useState([]);
  useEffect(() => {
    getNavbar();
    getFooter();
  }, []);
  const getNavbar = () => {
    axiosInstance
      .get("/api/navbar")
      .then((data) => {
        console.log(data.data);
        setNavbars(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFooter = () => {
    axiosInstance
      .get("/api/footer-contact")
      .then((data) => {
        console.log(data.data);
        setFooters(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full min-h-auto pt-8 bg-cyan-700 flex-col justify-center items-center gap-16 inline-flex">
      {/* <div className="self-stretch min-h-[170px] py-16 bg-stone-50 flex-col justify-center items-center flex"> 
        <div className="md2:w-[90%] w-full px-8 justify-center items-start gap-8 md2:inline-flex block ">
          <div className="grow w-full text-center shrink basis-0 flex-col justify-center items-start gap-6 inline-flex">
            <div className="self-stretch">
              <span className="text-black text-4xl font-semibold leading-[42px]">
                {lang[dil]?.subsText}
              </span>
            </div>
          </div>
          <div className="justify-end items-center gap-4 md2:flex block  ">
            <div className="md2:w-80 w-full md2:my-0 my-4 flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch h-[40px] px-3 bg-white rounded-[10px] border border-black border-opacity-20 justify-center items-center gap-2 inline-flex">
                <img src={mail} className="w-5 h-5 relative" />
                <input
                  className="grow shrink basis-0 h-[38px] border-none outline-none text-black text-opacity-50 text-base font-normal leading-snug"
                  placeholder={lang[dil]?.subEmail}
                />
              </div>
            </div>
            <div className=" cursor-pointer  h-[40px] px-4 md2:bg-neutral-900 bg-cyan-700 rounded-[10px] shadow justify-center items-center gap-2 flex">
              <div className="text-white px-2 text-lg font-medium leading-normal">
                {lang[dil]?.subscribe}
              </div>
            </div>
          </div>
        </div>
      </div>*/}
      <div className="self-stretch justify-center items-center inline-flex">
        <div className="min-h-[174px] w-[90%] justify-center items-start gap-8 flex">
          <div className="grow shrink basis-0 h-8 justify-start items-center gap-2.5 flex">
            <img
              className="w-16 h-16 text-blue border-white border-[1px]"
              src={logo}
            />
          </div>
          <div className="w-[80%] justify-center items-start gap-8 md2:flex block">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-white text-lg font-bold leading-snug">
                {lang[dil].navigation}
              </div>
              <div className="self-stretch h-[142px] flex-col justify-center items-start gap-2 flex">
                {navbars?.map((item, index) => {
                  return (
                    <div
                      onClick={() => history.push({ pathname: item.link })}
                      className="justify-center items-center gap-2 inline-flex"
                    >
                      <div className="text-white cursor-pointer text-base font-medium leading-snug">
                        {item?.is_active &&
                          item?.contents?.map((lang) => {
                            return lang[dil]?.name;
                          })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-white text-lg font-bold leading-snug">
                {lang[dil].contact}
              </div>
              <div className="self-stretch min-h-36 flex-col justify-center items-start gap-2 flex">
                <div className="md2:w-[567px] justify-center items-center gap-2 inline-flex flex-wrap">
                  <div className="grow shrink basis-0 text-white text-base font-normal leading-normal">
                    {footers?.length > 0 &&
                      footers[0]?.contents?.map((item) => {
                        return item[dil]?.address;
                      })}
                  </div>
                </div>
                <div className="justify-center items-center gap-2 inline-flex">
                  <div className="text-white text-base font-normal leading-normal">
                    {footers?.length > 0 && footers[0]?.phone}
                  </div>
                </div>
                <div className="justify-center items-center gap-2 inline-flex">
                  <div className="text-white text-base font-normal leading-normal">
                    {footers?.length > 0 && footers[0]?.email}
                  </div>
                </div>
                <div className="justify-center items-center gap-2 inline-flex">
                  <div className="text-white text-base font-normal leading-normal">
                    dashoguzpef.com.tm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[72px] py-5 bg-white flex-col justify-center items-center flex">
        <div className="w-[80%] px-8 justify-between items-center gap-8 inline-flex">
          <div className="w-8 h-8 relative" />
          <div className="text-black text-base whitespace-nowrap font-normal leading-snug">
            {dil == "tm"
              ? " ©2023 Ähli hukuklar goralan."
              : dil == "ru"
              ? " ©2023 Все права защищены."
              : " ©2023 All rights reserved."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
