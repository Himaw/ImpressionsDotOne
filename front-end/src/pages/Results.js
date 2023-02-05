import React, { useState, useEffect } from "react";
import FooterOne from "../common/footer/FooterOne";
import { BackTop } from "antd";
import HeaderTwo from "../common/header/HeaderTwo";
import SEO from "../common/SEO";
import BcrumbBannerOne from "../elements/breadcrumb/BcrumbBannerOne";
import CtaLayoutOne from "../component/cta/CtaLayoutOne";
import ColorSwitcher from "../elements/switcher/ColorSwitcher";
import CounterUpTwo from "../component/counterup/CounterUpTwo";
import TeamOne from "../component/team/TeamOne";
import VideoTwo from "../component/video/VideoTwo";
import CaseStudyProp from "../component/casestudy/CaseStudyProp";
import CounterUpOne from "../component/counterup/CounterUpOne";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { Alert, Space, Spin } from "antd";
import axios from "axios";

const Results = () => {
  const [analysisData, setAnalysisData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   axios
  //     .get("https://impressionsone.herokuapp.com/analyse")
  //     .then((response) => {
  //       console.log("SUCCESS", response);
  //       setAnalysisData(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("Hima");
  //       console.log(error);
  //     });
  // }, []);
  useEffect(() => {
    fetch("/analyse")
      .then((res) => res.json())
      .then((data) => {
        setAnalysisData(data);
        setIsLoading(false);
        // setAnalysisData({
        //   safeSearch: data.safeSearch,
        //   faces: data.faces,
        //   landmark: data.landmark,
        //   logos: data.logos,
        // });
        // console.log(analysisData);
        // console.log(data);
      });
  }, []);
  console.log(analysisData.finalScore);
  if (isLoading) {
    return (
      <>
      <SEO title="Loading" />
      <ColorSwitcher />
      <main className="main-wrapper ">
        
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
            <Spin size="large">
              <div className="content" />
            </Spin>
          </Space>
      </Space>
          
        
      </main>
      </>
    );
  }
  else{
  return (
    <>
      <SEO title="Results" />
      <ColorSwitcher />
      <main className="main-wrapper ">
        <HeaderTwo />

        <CounterUpTwo prop={analysisData} />

        <AnimationOnScroll
          animateIn="slideInRight"
          duration={1}
          animateOnce={true}
        >
          <CounterUpOne prop={analysisData} />
        </AnimationOnScroll>
        <AnimationOnScroll
          animateIn="slideInLeft"
          duration={1}
          animateOnce={true}
        >
          <div className="pt--250 pt_lg--200 pt_md--100 pt_sm--80 case-study-page-area ">
            <div className="container ">
              <CaseStudyProp prop={analysisData} />
            </div>
          </div>
        </AnimationOnScroll>

        <FooterOne parentClass="" />
      </main>
    </>
  );
  }
};

export default Results;
