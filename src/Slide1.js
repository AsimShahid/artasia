import React, { Component } from "react";
import styled, { css } from "styled-components";
import Cover_black from './Cover_black.jpg'
import frontcover from './frontcover.png'
import './slide1.css';

function Untitled(props) {
  return (
    <div className="imagecard">
    <Image
      src= { frontcover }
      resizeMode="contain"
    >
    </Image>
    </div>
  );
}

const Image = styled.img`
  display: flex;
  width: 527px;
  height: 527px;
  flex-direction: column;
  margin-top: 121px;
  margin-left: 241px;
`;

const Artasia = styled.span`
  font-family: Italianno;
  font-style: normal;
  font-weight: 400;
  color: rgba(40,33,35,1);
  font-size: 65px;
  margin-top: 60px;
  margin-left: 180px;
`;

const Image2 = styled.img`
  width: 428px;
  height: 100%;
  margin-top: 39px;
  margin-left: 50px;
  object-fit: contain;
`;

const LoremIpsum = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: #121212;
  margin-top: 50px;
  margin-left: 130px;
`;

export default Untitled;
