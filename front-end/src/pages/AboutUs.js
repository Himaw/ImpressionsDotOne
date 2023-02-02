import React from "react";
import FooterOne from "../common/footer/FooterOne";
import HeaderOne from "../common/header/HeaderOne";
import { BackTop } from 'antd';
import SEO from "../common/SEO";
import BcrumbBannerThree from "../elements/breadcrumb/BcrumbBannerThree";
import BcrumbBannerTwo from "../elements/breadcrumb/BcrumbBannerTwo";
import CtaLayoutOne from "../component/cta/CtaLayoutOne";
import ColorSwitcher from "../elements/switcher/ColorSwitcher";
import ProcessOne from "../component/process/ProcessOne";
import AboutThree from "../component/about/AboutThree";
import AboutFour from "../component/about/AboutFour";
import AboutFive from "../component/about/AboutFive";
import HeaderTwo from "../common/header/HeaderTwo";
import BreadCrumbOne from "../elements/breadcrumb/BreadCrumbOne";
import { AnimationOnScroll } from "react-animation-on-scroll";

const AboutUs = () => {
  return (
    <>
      <SEO title="About us" />
      <ColorSwitcher />
      <main className="main-wrapper">
        <HeaderTwo />
        <BreadCrumbOne title="" page="About Us" />
        
        <BcrumbBannerTwo
          title="How do we rate the thumbnails?"
          paragraph="We run the thumnails through various AI models to analyse them and ensure the thumbnails are more likely to please the youtube algorithm and thus have a greater chance of having a higher CTR. We also check if the thumbnails are safe to search and if they might get restricted by Google."
          mainThumb="/images/banner/ytl33.png"
        />
        
        {/* <ProcessOne /> */}
       
        {/* <BcrumbBannerTwo
          title="How do we rate the thumbnails?"
          paragraph="We run the thumnails through various AI models to analyse them and ensure the thumbnails are more likely to please the youtube algorithm and thus have a greater chance of having a higher CTR. We also check if the thumbnails are safe to search and if they might get restricted by Google."
          mainThumb="/images/others/demonitized.png"
        /> */}
       
        
        <AnimationOnScroll
          animateIn="slideInRight"
          duration={1}
          animateOnce={true}
        >

        <BcrumbBannerThree
            mainThumb="/images/others/demonitized1.png"
        />
          
        </AnimationOnScroll>
        {/* <AboutFour />               */}
        <AboutThree />
        
        

        <FooterOne parentClass="" />
      </main>
    </>
  );
};

export default AboutUs;
