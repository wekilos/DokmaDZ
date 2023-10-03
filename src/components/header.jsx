import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { BASE_URL, axiosInstance } from "../utils/axiosIntance";
import { Context } from "../context/context";
import { Drawer } from "antd";
import burger from "../images/burger.png";
import usa from "../images/united-states.svg";
import turkmen from "../images/turkmenistan.svg";
import russion from "../images/russia.svg";
const Header = () => {
  const history = useHistory();
  const { dil, ChangeDil } = useContext(Context);
  const [navbars, setNavbars] = useState([]);
  const [logo, setLogo] = useState([]);
  const [menu, setMenu] = useState(false);
  const [openDil, setOpenDil] = useState(false);
  useEffect(() => {
    getNavbar();
    getLogo();
  }, []);
  const getNavbar = () => {
    axiosInstance
      .get("/api/navbar")
      .then((data) => {
        console.log(data.data);
        let array = data.data?.filter((item) => {
          return item?._type == "header_footer" || item?._type == "header";
        });
        setNavbars(array);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getLogo = () => {
    axiosInstance
      .get("/api/site-logo")
      .then((data) => {
        console.log(data.data);
        setLogo(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full h-16 bg-cyan-700 border-b border-zinc-100 flex-col justify-center items-center inline-flex">
      <Drawer
        open={menu}
        onClose={() => setMenu(false)}
        placement="right"
        width={350}
        closable={false}
        bodyStyle={{ background: "#0C7698" }}
      >
        <div className="grow shrink flex flex-col  basis-0 h-[22px] justify-start items-center gap-6 ">
          {navbars?.map((item, index) => {
            return (
              <div
                onClick={() => history.push({ pathname: item.link })}
                className="justify-center items-center gap-1 flex"
              >
                <div className="text-center text-white text-base font-medium leading-snug">
                  {item?.is_active &&
                    item?.contents?.map((lang) => {
                      return lang[dil]?.name;
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </Drawer>
      <div className="w-[90%] px-8 md:justify-center justify-between items-center gap-8 inline-flex">
        <Link to="/">
          <img
            className="w-[60px] h-[60px] text-blue border-white border-[1px]"
            src={logo[0]?.logo[0]?.src}
          />
        </Link>
        <div
          onClick={() => setMenu(true)}
          className="block md:hidden cursor-pointer"
        >
          <img className="w-[55px] h-[55px] text-blue" src={burger} />
        </div>
        <div className="grow shrink md:flex hidden basis-0 h-[22px] justify-start items-center gap-6 ">
          {navbars?.map((item, index) => {
            return (
              <div
                onClick={() => history.push({ pathname: item.link })}
                className="justify-center items-center gap-1 flex"
              >
                <div className="text-center cursor-pointer text-white text-[18px] font-medium leading-snug">
                  {item?.is_active &&
                    item?.contents?.map((lang) => {
                      return lang[dil]?.name;
                    })}
                </div>
              </div>
            );
          })}
          <div
            onClick={() => setOpenDil(!openDil)}
            className="justify-center cursor-pointer items-center gap-1 flex"
          >
            <div className="text-center flex gap-4  uppercase whitespace-nowrap text-white text-[18px] font-medium leading-snug">
              <img src={dil == "tm" ? turkmen : dil == "ru" ? russion : usa} />
              {/* {dil} */}
            </div>
            {openDil && (
              <div className="absolute top-12 z-30  py-2 rounded-[12px] bg-blue bg-opacity-95">
                <div
                  className={
                    dil == "tm"
                      ? "bg-opacity-80 flex gap-4   text-[18px] px-8 py-1 mb-1 rounded-[12px] bg-slate-700 hover:bg-opacity-80    font-semi text-white"
                      : "px-8 py-1 mb-1 flex gap-4  text-[18px]  rounded-[12px] bg-slate-700 hover:bg-opacity-80 bg-opacity-5  font-semi text-white"
                  }
                  onClick={() => ChangeDil("tm")}
                >
                  <img src={turkmen} />
                  TM
                </div>

                <div
                  className={
                    dil == "ru"
                      ? "bg-opacity-80 flex gap-4  text-[18px] px-8 py-1 mb-1 rounded-[12px] bg-slate-700 hover:bg-opacity-80    font-semi text-white"
                      : "px-8 py-1 mb-1 flex gap-4  text-[18px] rounded-[12px] bg-slate-700 hover:bg-opacity-80 bg-opacity-5  font-semi text-white"
                  }
                  onClick={() => ChangeDil("ru")}
                >
                  <img src={russion} />
                  RU
                </div>

                <div
                  className={
                    dil == "eng"
                      ? "bg-opacity-80 flex gap-4  text-[18px] px-8 py-1 mb-1 rounded-[12px] bg-slate-700 hover:bg-opacity-80    font-semi text-white"
                      : "px-8 py-1 mb-1 flex gap-4  text-[18px] rounded-[12px] bg-slate-700 hover:bg-opacity-80 bg-opacity-5  font-semi text-white"
                  }
                  onClick={() => ChangeDil("eng")}
                >
                  <img src={usa} />
                  ENG
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
