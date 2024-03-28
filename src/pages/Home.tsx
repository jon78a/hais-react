import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [isMobile, setIsMobile] = useState<boolean>();

  useEffect(() => {
    const newWidth = window.screen.width;
    setIsMobile(newWidth < 450);
  }, []);

  return (
    <div className="mx-auto w-full">
      <div className="relative p-1">
        <img src="/Hais_Banner1.png" alt="banner3" width={`100%`} />
        <Link to="/subject/recommend">
          <button className="z-50 absolute text-white bg-[#4E9E65] font-bold left-[20%] top-[80%] w-[15%] h-[15%] rounded-xl ">
            <p className={`${isMobile ? `text-[8px]` : `text-xl`}`}>교과탐색</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export const CarouselSM = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const matchesMobile = useMediaQuery("(max-width:449px)");

  return (
    <div className={`px-12 ${matchesMobile ? "w-full" : "hidden"}`}>
      <Slider {...settings}>
        <div className="relative">
          <img
            src="/Hais_Banner1_SM.png"
            alt="banner1"
            className="rounded-2xl"
          />
        </div>
        <div className="relative">
          <img
            src="/Hais_Banner2_SM.png"
            alt="banner1"
            className="rounded-2xl"
          />
        </div>
        <div>
          <img
            src="/Hais_Banner1_SM.png"
            alt="banner1"
            className="rounded-2xl"
          />
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Slider>
    </div>
  );
};

const filter = createFilterOptions<UnivOptionType>();

export function FreeSoloCreateOption() {
  const [value, setValue] = React.useState<UnivOptionType | null>(null);
  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            univName: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            univName: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      sx={{
        fontSize: 20,
        py: 2,
      }}
      size="small"
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="대학검색"
      options={UnivOption}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.univName;
      }}
      renderOption={(props, option) => <li {...props}>{option.univName}</li>}
      freeSolo
      renderInput={(params) => <TextField {...params} label="대학검색" />}
    />
  );
}

interface UnivOptionType {
  inputValue?: string;
  univName: string;
}

const UnivOption: readonly UnivOptionType[] = [
  { univName: "한양대학교" },
  { univName: "서울대학교" },
  { univName: "고려대학교" },
];
//추후 대학 정보 map

const HomePage = (): JSX.Element => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
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

export default HomePage;
