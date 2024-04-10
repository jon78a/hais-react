import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import premiumRepository from "../driver/repository/PremiumRepository";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { premiumState } from "../schema/states/Premium";
import { firebaseStorageURL } from "../driver/firebase/firebase";

export const Carousel = () => {
  const [isMobile, setIsMobile] = useState<boolean>();
  const premiumInfo = useRecoilValue(premiumState);

  useEffect(() => {
    const newWidth = window.screen.width;
    setIsMobile(newWidth < 450);
  }, []);

  return (
    <div className="mx-auto w-full">
      <div className="relative p-1">
        <img
          src={
            firebaseStorageURL +
            premiumInfo?.bannerSrc?.replaceAll("/", "%2F") +
            "?alt=media"
          }
          alt="banner3"
          width={`100%`}
        />
        <Link to="/subject/recommend">
          <button className="z-50 absolute text-white bg-[#4E9E65] font-bold left-[24px] top-[80%] w-[15%] h-[15%] rounded-xl ">
            <p className={`${isMobile ? `text-[8px]` : `text-xl`}`}>교과탐색</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

const PremiumHomePage = (): JSX.Element => {
  let { id } = useParams();
  const setPremiumInfo = useSetRecoilState(premiumState);

  useEffect(() => {
    if (id) {
      premiumRepository.get(id).then((data) => {
        setPremiumInfo({ ...data, id });
      });
    }
  }, []);

  const screenWidth = window.screen.width;

  return (
    <>
      <div
        className={`flex flex-col justify-center w-full`}
        style={{
          marginTop: `${screenWidth * 0.03}px`,
          marginBottom: `${screenWidth * 0.06}px`,
        }}
      >
        <Carousel />
        <img
          src="/Hais_Home_info.png"
          alt="info"
          style={{
            marginTop: `${screenWidth * 0.07}px`,
            marginBottom: `${screenWidth * 0.03}px`,
          }}
        />
        <img
          src="/Hais_recommend_info.png"
          alt="info"
          style={{
            marginTop: `${screenWidth * 0.03}px`,
            marginBottom: `${screenWidth * 0.06}px`,
          }}
        />
      </div>
    </>
  );
};

export default PremiumHomePage;
