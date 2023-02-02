import React from 'react';
import Tilty from 'react-tilty';

const BcrumbBannerThree = ({title, paragraph, mainThumb}) => {
    return (
        <div className="breadcrum-area breadcrumb-banner single-breadcrumb">
            <div className="container">
                <div className="row align-items-center">
                    
                    <div className="col-lg-6">
                        <div className="banner-thumbnail">
                            <Tilty perspective={2000} reset={true}>
                                <img className='dollar' src={process.env.PUBLIC_URL + mainThumb} alt="Illustration" />
                            </Tilty>
                        </div>
                    </div>
                    <div className="col-lg-6">
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
                        </div>
                    </div>
                    <div className="col-lg-6 dollar11 " >
                        <div className="banner-thumbnail">
                            <Tilty perspective={2000} reset={true}>
                                <img className='dollar1' src={process.env.PUBLIC_URL + mainThumb} alt="Illustration" />
                            </Tilty>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="shape-group-8 list-unstyled">
                {/* <li className="shape shape-1">
                    <img src={process.env.PUBLIC_URL + "/images/others/bubble-9.png"} alt="Bubble" />
                </li>
                <li className="shape shape-2">
                    <img src={process.env.PUBLIC_URL + "/images/others/bubble-20.png"} alt="Bubble" />
                </li>
                <li className="shape shape-3">
                    <img src={process.env.PUBLIC_URL + "/images/others/line-4.png"} alt="Line" />
                </li> */}
                {/* <li className="shape shape-3">
              <img
                src={process.env.PUBLIC_URL + "/images/others/circle-4.png"}
                alt="Circle"
              />
            </li> */}
            </ul>
        </div>
    )
}

export default BcrumbBannerThree;
