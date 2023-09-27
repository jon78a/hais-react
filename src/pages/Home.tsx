import React from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

export const Carousel=()=>{
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      
      <div className="w-[70%] min-w-[1099px]"> 
        <Slider {...settings}>
          <div className="relative">
            <img src="/Hais_Banner1.png" alt="banner1"/>
            <Link to="/Subject">
                  <button className='z-50 p-3 absolute text-white bg-[#4E9E65] font-bold left-[10%] top-[80%] rounded-2xl'><p>교과탐색</p></button>
            </Link>
          </div>
          <div className="relative">
          <img src="/Hais_Banner2.png" alt="banner2"/>
           <div className="'z-50 p-3 absolute left-[10%] top-[75%]"><FreeSoloCreateOption /></div>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Slider>
      </div>
    );
}



const filter = createFilterOptions<UnivOptionType>();

export  function FreeSoloCreateOption() {
  const [value, setValue] = React.useState<UnivOptionType | null>(null);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            univName: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
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
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="대학검색"
      options={UnivOption}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.univName;
      }}
      renderOption={(props, option) => <li {...props}>{option.univName}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="대학검색" />
      )}
    />
  );
}

interface UnivOptionType {
  inputValue?: string;
  univName: string;
}

const UnivOption: readonly UnivOptionType[] = [{univName: '한양대학교'}, {univName : '서울대학교'},{univName : '고려대학교'}]
//추후 대학 정보 map

const HomePage = (): JSX.Element => {
	return (
		<div className="flex justify-center w-[100%]"><Carousel /></div>
	);
}

export default HomePage;