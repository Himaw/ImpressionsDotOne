import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import TrackVisibility from "react-on-screen";

const Data = [
  {
    id: 1,
    light_icon: "/images/icon/race.png",
    dark_icon: "/images/icon/race.png",
    countNum: 65,
    text: "Racy",
  },
  {
    id: 2,
    light_icon: "/images/icon/laugh.png",
    dark_icon: "/images/icon/laugh.png",
    countNum: 63,
    text: "Spoof",
  },
  {
    id: 3,
    light_icon: "/images/icon/gun.png",
    dark_icon: "/images/icon/gun.png",
    countNum: 99,
    text: "Violence",
  },
  {
    id: 4,
    light_icon: "/images/icon/sexual.png",
    dark_icon: "/images/icon/sexual.png",
    countNum: 84,
    text: "Adult",
  },
];

const CounterUpSafeSearch = ({ colSize, layoutStyle, evenTopMargin, prop }) => {
  // const [analysisData, setAnalysisData] = useState({});
  // useEffect(() => {
  //   fetch("/analyse")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAnalysisData({
  //         safeSearch: data.safeSearch,
  //       });
  //     });
  // }, []);
  return (
    <>
      {Data.map((data) => (
        <div
          className={`${colSize} ${data.id % 2 === 0 ? evenTopMargin : ""}`}
          key={data.id}
        >
          <div className={`counterup-progress ${layoutStyle}`}>
            {layoutStyle === "counterup-style-2" ? (
              <div className="icon">
                <img
                  className="dark-icon"
                  src={process.env.PUBLIC_URL + data.dark_icon}
                  alt="Icon"
                />
                <img
                  className="light-icon"
                  src={process.env.PUBLIC_URL + data.light_icon}
                  alt="Icon"
                />
              </div>
            ) : (
              <div className="icon">
                <img
                  src={process.env.PUBLIC_URL + data.light_icon}
                  alt="Icon"
                />
              </div>
            )}

            <div className="count-number h2">
              <TrackVisibility once>
                {({ isVisible }) => (
                  <span className="number count">
                    {isVisible ? (
                      data.id == 1 ? (
                        <CountUp end={prop[0][5] * 20} duration={1} />
                      ) : data.id == 2 ? (
                        <CountUp end={prop[0][3] * 20} duration={1} />
                      ) : data.id == 3 ? (
                        <CountUp end={prop[0][4] * 20} duration={1} />
                      ) : (
                        <CountUp end={prop[0][2] * 20} duration={1} />
                      )
                    ) : null}
                  </span>
                )}
              </TrackVisibility>
              <span className="symbol">%</span>
            </div>
            <h6 className="title">{data.text}</h6>
          </div>
        </div>
      ))}
    </>
  );
};

export default CounterUpSafeSearch;
