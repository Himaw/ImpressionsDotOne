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
import axios from "axios";

const Results = () => {
  // const [analysisData, setAnalysisData] = useState({});
  useEffect(() => {
    // fetch("/analyse")
    axios
      .get("/analyse")
      .then((res) => res.json())
      .then((data) => {
        // setAnalysisData({
        //   safeSearch: data.safeSearch,
        //   faces: data.faces,
        //   landmark: data.landmark,
        //   logos: data.logos,
        // });
        // console.log(analysisData);
        console.log(data);
      });
  }, []);
  return (
    <>
      <SEO title="Results" />
      <ColorSwitcher />
      <main className="main-wrapper ">
        <HeaderTwo />

        <CounterUpTwo />

        <AnimationOnScroll
          animateIn="slideInRight"
          duration={1}
          animateOnce={true}
        >
          <CounterUpOne />
        </AnimationOnScroll>
        <AnimationOnScroll
          animateIn="slideInLeft"
          duration={1}
          animateOnce={true}
        >
          <div className="pt--250 pt_lg--200 pt_md--100 pt_sm--80 case-study-page-area ">
            <div className="container ">
              <CaseStudyProp />
            </div>
          </div>
        </AnimationOnScroll>

        <FooterOne parentClass="" />
      </main>
    </>
  );
};

export default Results;
