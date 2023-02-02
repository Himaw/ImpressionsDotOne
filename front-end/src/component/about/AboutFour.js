import React from "react";
import { Link, Route } from "react-router-dom";
import CountUp from "react-countup";
import TrackVisibility from "react-on-screen";

const AboutFour = () => {
  return (
    <div className="section section-padding case-study-featured-area">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-6 ">
            <div className="case-study-featured-thumb text-start">
              <img className="hidingimg"
                src={process.env.PUBLIC_URL + "/images/others/demonitized1.png"}
                alt="travel"
              />
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="case-study-featured">
              <div className="section-heading heading-left">
                <span className="subtitle">Safe Search...</span>
                <h2 className="title">How does it effect me?</h2>
                <p>
                  Google SafeSearch is a feature that filters out explicit or
                  inappropriate content from Google's search results. This
                  includes filtering out content that contains nudity, graphic
                  violence, and other adult themes.
                </p>
                <p>
                  For YouTube, it's also important because if your video
                  thumbnail is not appropriate (violates their guideline) it
                  will be age restricted, which will limit the audience that can
                  see the video, and can also lead to demonetization.
                </p>
                <Link
                  to="~/https://support.google.com/youtube/answer/9229980?hl=en"
                  className="axil-btn btn-fill-primary btn-large"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFour;
