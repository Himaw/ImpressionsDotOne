import React from "react";
import SectionTitle from "../../elements/section-title/SectionTitle";

const Datas = [
  {
    id: 1,
    title: "Increased click-through rate (CTR)",
    para: "A well-designed thumbnail can grab the attention of viewers and entice them to click on the video. This can lead to higher CTR and more views.",
  },
  {
    id: 2,
    title: "Improved video visibility",
    para: "A thumbnail is one of the first things viewers will see when browsing through YouTube, so a good thumbnail can help make your video stand out among the competition.",
  },
  {
    id: 3,
    title: "Increased engagement",
    para: "A good thumbnail can also serve as a preview of the content in the video, which can encourage viewers to watch the entire video and engage with it.",
  },
  {
    id: 4,
    title: "Better search visibility",
    para: "A well-designed and relevant thumbnail can also help improve the visibility of your video in search results, leading to more views and engagement.",
  },
  {
    id: 5,
    title: "Branding",
    para: "A consistent and coherent thumbnail can help to reinforce your brand and make it more memorable to your audience.",
  },
];

const AboutThree = () => {
  return (
    <div className="section section-padding bg-color-dark pb--80 pb_lg--40 pb_md--20">
      <div className="container">
        <SectionTitle
          subtitle="Thumbnails..."
          title="Why even bother?"
          description="A good thumbnail can have a significant impact on the performance of a YouTube video. Some of the effects of a good thumbnail include:"
          textAlignment="heading-left heading-light-left mb--100"
          textColor=""
        />

        <div className="row">
          {Datas.map((data) => (
            <div className="col-lg-4" key={data.id}>
              <div className="about-quality">
                <h3 className="sl-number">{data.id}</h3>
                <h5 className="title">{data.title}</h5>
                <p>{data.para}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ul className="list-unstyled shape-group-10">
        <li className="shape shape-1">
          <img
            src={process.env.PUBLIC_URL + "/images/others/circle-1.png"}
            alt="Circle"
          />
        </li>
        <li className="shape shape-2">
          <img
            src={process.env.PUBLIC_URL + "/images/others/line-3.png"}
            alt="Circle"
          />
        </li>
        {/* <li className="shape shape-3">
          <img
            src={process.env.PUBLIC_URL + "/images/others/bubble-5.png"}
            alt="Circle"
          />
        </li> */}
      </ul>
    </div>
  );
};

export default AboutThree;
