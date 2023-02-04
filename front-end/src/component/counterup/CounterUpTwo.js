import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import CounterUp from "./CounterUp";
import Tilty from "react-tilty";
// import analysisImage from "../../../flask-server/images/analysisImage.png";

const CounterUpTwo = () => {
  const [analysisData, setAnalysisData] = useState({});
  useEffect(() => {
    fetch("/analyse")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAnalysisData({
          finalScore: data.finalScore,
          image: data.image,
        });
      });
  }, []);
  return (
    <div className="section section-padding expert-counterup-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="section-heading heading-left">
              <div className="col-lg-6">
                <Tilty perspective={2000} reset={true}>
                  <img
                    className="thumbnail-preview"
                    // src={require("./analysisImage.png")}
                    src={
                      "https://storage.googleapis.com/analysisimagebucket/" +
                      analysisData.image
                    }
                    // src="https://storage.googleapis.com/analysisimagebucket/image1.png"
                    alt="Input Thumbnail"
                  />
                </Tilty>
              </div>
              <span className="subtitle">Final Score...</span>
              <h2>{analysisData.finalScore}%</h2>
              <p className="mb--50">
                The thumbnail is in the top 2 percentile of all thumbnails on
                youtube, it is more likely to get the video more views and
                impressions.
              </p>
            </div>
          </div>
          <div className="col-lg-6 offset-xl-1">
            <div className="row">
              <CounterUp
                colSize="col-sm-6"
                layoutStyle="counterup-style-2"
                evenTopMargin=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterUpTwo;
