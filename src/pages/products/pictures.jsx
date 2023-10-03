import React, { useContext, useState, useEffect } from "react";
import Navigation from "../../components/navigation";

import { Context } from "../../context/context";
import lang from "../../lang/home.json";
import { axiosInstance } from "../../utils/axiosIntance";
const Products = () => {
  const [pictures, setPictures] = useState([]);
  const { dil } = useContext(Context);

  useEffect(() => {
    getGallery();
  }, []);

  const getGallery = () => {
    axiosInstance
      .get("/api/gallery")
      .then((data) => {
        data.data?.length && setPictures(data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full">
      <Navigation path={lang[dil]?.gallery} />
      <div className="w-full">
        <div className="w-[85%] mx-auto mt-16 text-black text-5xl font-semibold leading-[54px]">
          {lang[dil]?.gallery}
        </div>
      </div>
      <div className="w-full flex items-center">
        <div className="w-[85%] mx-auto py-16 justify-center items-center gap-8 inline-flex flex-wrap">
          {pictures?.images_for_web?.map((item, index) => {
            return (
              <img
                className="w-96 h-[480px] relative rounded-[10px]"
                src={item?.src}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
