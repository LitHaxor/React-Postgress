import React from "react";
import {BsHeartFill,BsHeartHalf, BsHeart}  from 'react-icons/bs';
import styled from '@emotion/styled';
const StarRating = ({ rating }) => {
  //rating =4
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<BsHeartFill/>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<BsHeartHalf/>);
    } else {
      stars.push(<BsHeart/>);
    }
  }
  return <Stars>{stars}</Stars>;
};

const Stars = styled.div`
  color:  #e60000;
`


export default StarRating;