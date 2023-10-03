import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../context/context";
import { axiosInstance } from "../../utils/axiosIntance";
import Navigation from "../../components/navigation";
import map from "../../images/map2.png";
import mail from "../../images/mail.svg";
import logo from "../../images/logo.svg";
import lang from "../../lang/home.json";
const Contact = () => {
  const history = useHistory();
  const { dil } = useContext(Context);
  const [footers, setFooters] = useState([]);
  useEffect(() => {
    getFooter();
  }, []);

  const getFooter = () => {
    axiosInstance
      .get("/api/footer-contact")
      .then((data) => {
        data.data?.length > 0 && setFooters(data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Navigation path={lang[dil]?.contact} />
      <div className="w-full   py-24 justify-start items-start gap-8 md2:inline-flex block">
        <div className="grow md2:w-1/2 w-full shrink basis-0 h-[445px] md2:pl-28 pl-8 pt-7 bg-white flex-col justify-start items-start gap-8 inline-flex">
          <div className="self-stretch h-auto flex-col justify-center items-start gap-6 flex">
            <div className="self-stretch text-black text-5xl font-semibold leading-[54px]">
              {lang[dil]?.contact}
            </div>
            <div className="flex-col justify-start items-start gap-2.5 flex">
              <div className=" md2:min-w-[400px] w-full">
                <span className="text-black text-lg font-bold leading-normal">
                  {lang[dil]?.address}:
                </span>
                <span className="text-black text-lg font-normal leading-normal">
                  {" "}
                  {footers?.contents?.map((item) => {
                    return item[dil]?.address;
                  })}
                </span>
              </div>
              <div className="">
                <span className="text-black text-lg font-bold leading-normal">
                  {lang[dil]?.phonenumber}:
                </span>
                <span className="text-black text-lg font-normal leading-normal">
                  {" "}
                  {footers?.phone}
                </span>
              </div>
              <div className="">
                <span className="text-black text-lg font-bold leading-normal">
                  {lang[dil]?.email}:
                </span>
                <span className="text-black text-lg font-normal leading-normal">
                  {" "}
                  {footers?.email}
                </span>
              </div>
            </div>
          </div>
        </div>
        <img
          className="md2:w-1/2 w-full h-[445px] object-cover relative md2:rounded-tl-[100px] md2:rounded-bl-[100px] md2:rounded-none rounded-[100px]"
          src={map}
        />
      </div>
    </div>
  );
};

export default Contact;
