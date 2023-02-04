import { useState, useEffect, React } from "react";
import CountUp from "react-countup";
import TrackVisibility from "react-on-screen";

const Data = [
  {
    id: 1,
    light_icon: "/images/icon/shield.png",
    dark_icon: "/images/icon/shield.png",
    countNum: 87,
    text: "Safe Search",
  },
  {
    id: 2,
    light_icon: "/images/icon/shocked.png",
    dark_icon: "/images/icon/shocked.png",
    countNum: 65,
    text: "Faces",
  },
  {
    id: 3,
    light_icon: "/images/icon/destination.png",
    dark_icon: "/images/icon/destination.png",
    countNum: 69,
    text: "Landmarks",
  },
  {
    id: 4,
    light_icon: "/images/icon/youtube.png",
    dark_icon: "/images/icon/youtube.png",
    countNum: 64,
    text: "Logos",
  },
];

const CounterUp = ({ colSize, layoutStyle, evenTopMargin, prop }) => {
  // const [analysisData, setAnalysisData] = useState({});
  // useEffect(() => {
  //   fetch("/analyse")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAnalysisData({
  //         safeSearch: data.safeSearch[1],
  //         faces: data.faces[1],
  //         landmark: data.landmark[1],
  //         logos: data.logos[1],
  //       });
  //     });
  // }, []);
  // let safeSearch = prop.safeSearch;
  // console.log(safeSearch[1]);
  // const { faces, finalScore, image, landmark, logos, safeSearch } = prop;
  // console.log(prop);
  // const faces = prop.faces;
  // console.log(faces[1]);
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
                        <CountUp end={prop.safeSearch[1]} duration={1} />
                      ) : data.id == 2 ? (
                        <CountUp
                          end={(prop.faces[1] / 30) * 100}
                          duration={1}
                        />
                      ) : data.id == 3 ? (
                        prop.landmark[1] === 0 ? (
                          <CountUp end={100} duration={1} />
                        ) : (
                          <CountUp end={0} duration={1} />
                        )
                      ) : prop.logos[1] === 0 ? (
                        <CountUp end={100} duration={1} />
                      ) : (
                        <CountUp end={0} duration={1} />
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

export default CounterUp;
