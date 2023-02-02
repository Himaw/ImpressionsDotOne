import React from 'react';
import SectionTitle from '../../elements/section-title/SectionTitle';
import ProcesstData from "../../data/process/ProcessData.json";
import Tilty from 'react-tilty';
import { AnimationOnScroll } from "react-animation-on-scroll";

const getProcesstData = ProcesstData;

const ProcessOne = () => {
    
    return (
        
        <div className="section section-padding bg-color-light pb--70">
            <SectionTitle 
                subtitle="Safe Search..."
                title="How does it effect me?"
                description="Google SafeSearch is a feature that filters out explicit or inappropriate content from Google's search results. This includes filtering out content that contains nudity, graphic violence, and other adult themes.   For YouTube, it's also important because if your video thumbnail is not appropriate (violates their guideline) it will be age restricted, which will limit the audience that can see the video, and can also lead to demonetization."
                textAlignment=""
                textColor="mb--90"
            />
            
          
{/*         
            <div className="container">
                
                {getProcesstData.map((data) => (

                    
                    
                     <AnimationOnScroll
                     animateIn="slideInRight"
                     duration={1}
                     animateOnce={true}
                   >
                    
                    <div key={data.id} className={`process-work ${(data.id % 2  === 0) ? "content-reverse" : ""}`}>
                        <Tilty perspective={2000}>
                            <div className="thumbnail">
                                <img src={process.env.PUBLIC_URL + data.thumb} alt="Thumbnail" />
                            </div>
                        </Tilty>
                    <div className="content">
                        <span className="subtitle">{data.subtitle}</span>
                        <h3 className="title">{data.title}</h3>
                        <p>{data.paragraph}</p>
                    </div>
                </div>
                </AnimationOnScroll>
                ))}
            </div> */}
           
            <ul className="shape-group-17 list-unstyled">
                {/* <li className="shape shape-1"><img src={process.env.PUBLIC_URL + "/images/others/bubble-24.png"} alt="Bubble" /></li> */}
                {/* <li className="shape shape-2"><img src={process.env.PUBLIC_URL + "/images/others/bubble-23.png"} alt="Bubble" /></li> */}
                <li className="shape shape-3"><img src={process.env.PUBLIC_URL + "/images/others/line-4.png"} alt="Line" /></li>
                <li className="shape shape-4"><img src={process.env.PUBLIC_URL + "/images/others/line-5.png"} alt="Line" /></li>
                {/* <li className="shape shape-5"><img src={process.env.PUBLIC_URL + "/images/others/line-4.png"} alt="Line" /></li>
                <li className="shape shape-6"><img src={process.env.PUBLIC_URL + "/images/others/line-5.png"} alt="Line" /></li> */}
            </ul>
        </div>
    )
}

export default ProcessOne;