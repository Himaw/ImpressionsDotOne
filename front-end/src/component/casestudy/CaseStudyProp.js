import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CaseStudyData from "../../data/casestudy/CaseStudyData.json";
import Tilty from "react-tilty";
import CountUp from "react-countup";
import TrackVisibility from "react-on-screen";
import { slugify } from "../../utils";

const allData = CaseStudyData;
const CountData = [
  {
    id: 1,
    title: "Anger",
    count_num: "5",
  },
  {
    id: 2,
    title: "Joy",
    count_num: "30",
  },
  {
    id: 3,
    title: "Surprised",
    count_num: "30",
  },
  {
    id: 4,
    title: "Sorrow",
    count_num: "30",
  },
];

const CaseStudyProp = ({ prop }) => {
  const CaseLeftThumb = ({ data }) => {
    // const [analysisData, setAnalysisData] = useState({});
    // // const [bestFace, setBestFace] = useState(2);
    // useEffect(() => {
    //   fetch("/analyse")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setAnalysisData({
    //         faces: data.faces,
    //       });
    //     });
    // }, []);
    return (
      <>
        <div className="col-lg-6">
          <div className={`case-study-featured-thumb thumb-${data.id}`}>
            <Tilty perspective={2000} reset={true}>
              <img src={process.env.PUBLIC_URL + data.thumb} alt="Case Study" />
            </Tilty>
          </div>
        </div>
        <div className="col-xl-5 col-lg-6 offset-xl-1">
          <div className="case-study-featured">
            <div className="section-heading heading-left">
              <span className="subtitle">{data.subtitle}</span>
              <h2 className="title">{data.title}</h2>
              <p>{data.excerpt}</p>
              {/* <Link
                to={
                  process.env.PUBLIC_URL +
                  `/case-details/${slugify(data.title)}`
                }
                className="axil-btn btn-fill-primary btn-large"
              >
                Read Case Study
              </Link> */}
            </div>
            <div className="case-study-counterup">
              <div className="single-counterup">
                <div className="count-number h3">
                  <TrackVisibility once>
                    {({ isVisible }) => (
                      <span className="number count">
                        {isVisible ? (
                          <CountUp
                            end={(prop.faces[1] / 30) * 100}
                            duration={1}
                          />
                        ) : null}
                      </span>
                    )}
                  </TrackVisibility>
                  <span className="symbol">%</span>
                </div>
                <span className="counter-title">Final Score</span>
              </div>
              <div className="single-counterup">
                <div className="count-number h3">
                  <span className="symbol"># </span>
                  <TrackVisibility once>
                    {({ isVisible }) => (
                      <span className="number count">
                        {isVisible ? (
                          //find the highest surprised score
                          <CountUp end={prop.faces.length - 3} duration={1} />
                        ) : null}
                      </span>
                    )}
                  </TrackVisibility>
                </div>
                <span className="counter-title">Faces Visible</span>
              </div>
            </div>
          </div>
        </div>
        {/* {analysisData.faces.length > 2 ? ( */}
        <div className="row justify-content-center ">
          <div className="col-xl-5 col-lg-6  section splash-main-banner faces-val-score">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="banner-content">
                    <div className="site-element-count">
                      {CountData.map((data) => (
                        <div className="count-box" key={data.id}>
                          <span className="count-title">{data.title}</span>

                          <div className="count-number h2">
                            <TrackVisibility once>
                              {({ isVisible }) => (
                                <span className="number count">
                                  {isVisible ? (
                                    prop.faces.length > 3 ? (
                                      <CountUp
                                        end={
                                          prop.faces[prop.faces[2]][data.id] *
                                          20
                                        }
                                        duration={1}
                                      />
                                    ) : null
                                  ) : null}
                                </span>
                              )}
                            </TrackVisibility>
                            <span className="symbol">%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ) : null} */}
      </>
    );
  };

  const CaseRightThumb = ({ data }) => {
    // const [analysisData, setAnalysisData] = useState({});
    // useEffect(() => {
    //   fetch("/analyse")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setAnalysisData({
    //         landmark: data.landmark,
    //       });
    //     });
    // }, []);
    return (
      <>
        <div className="col-lg-6 offset-xl-1 order-lg-2">
          <div className={`case-study-featured-thumb thumb-${data.id}`}>
            <Tilty perspective={2000} reset={true}>
              <img src={process.env.PUBLIC_URL + data.thumb} alt="Case Study" />
            </Tilty>
          </div>
        </div>
        <div className="col-lg-5 order-lg-1">
          <div className="case-study-featured">
            <div className="section-heading heading-left">
              <span className="subtitle">{data.subtitle}</span>
              <h2 className="title">{data.title}</h2>
              <p>{data.excerpt}</p>
              {/* <Link
                to={
                  process.env.PUBLIC_URL +
                  `/case-details/${slugify(data.title)}`
                }
                className="axil-btn btn-fill-primary btn-large"
              >
                Read Case Study
              </Link> */}
            </div>
            <div className="case-study-counterup">
              <div className="single-counterup">
                <div className="count-number h3">
                  <span className="symbol"># </span>
                  <TrackVisibility once>
                    {({ isVisible }) => (
                      <span className="number count">
                        {isVisible ? (
                          <CountUp
                            end={Math.ceil((prop.landmark.length - 2) / 2)}
                            duration={1}
                          />
                        ) : null}
                      </span>
                    )}
                  </TrackVisibility>
                </div>
                <span className="counter-title">Landmarks Visible</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const CaseCelebLogos = ({ data }) => {
    // const [analysisData, setAnalysisData] = useState({});
    // useEffect(() => {
    //   fetch("/analyse")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setAnalysisData({
    //         logos: data.logos,
    //       });
    //     });
    // }, []);
    return (
      <>
        <div className="col-lg-6">
          <div className={`case-study-featured-thumb thumb-${data.id}`}>
            <Tilty perspective={2000} reset={true}>
              <img src={process.env.PUBLIC_URL + data.thumb} alt="Case Study" />
            </Tilty>
          </div>
        </div>
        <div className="col-xl-5 col-lg-6 offset-xl-1">
          <div className="case-study-featured">
            <div className="section-heading heading-left">
              <span className="subtitle">{data.subtitle}</span>
              <h2 className="title">{data.title}</h2>
              <p>{data.excerpt}</p>
              {/* <Link
                to={
                  process.env.PUBLIC_URL +
                  `/case-details/${slugify(data.title)}`
                }
                className="axil-btn btn-fill-primary btn-large"
              >
                Read Case Study
              </Link> */}
            </div>
            <div className="case-study-counterup">
              <div className="single-counterup">
                <div className="count-number h3">
                  <span className="symbol"># </span>
                  <TrackVisibility once>
                    {({ isVisible }) => (
                      <span className="number count">
                        {isVisible ? (
                          <CountUp end={prop.logos.length - 2} duration={1} />
                        ) : null}
                      </span>
                    )}
                  </TrackVisibility>
                </div>
                <span className="counter-title">Logos Visible</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {allData.map((data) => (
        <div className="row" key={data.id}>
          {data.id % 3 === 0 ? (
            <CaseCelebLogos data={data} />
          ) : data.id % 2 === 0 ? (
            <CaseRightThumb data={data} />
          ) : (
            <CaseLeftThumb data={data} />
          )}
        </div>
      ))}
    </>
  );
};

export default CaseStudyProp;
