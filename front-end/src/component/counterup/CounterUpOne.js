import React from "react";
import SectionTitle from "../../elements/section-title/SectionTitle";
import CounterUpSafeSearch from "../../component/counterup/CounterUpSafeSearch";

const CounterUpOne = () => {
  return (
    <div className="section section-padding bg-color-dark">
      <div className="container">
        <SectionTitle
          subtitle="Safe Search Results"
          title="Find if YouTube will push your thumbnail"
          description="While there are many other factors that determine if YouTube pushes a video, a thumbnail is a key factor creators often ignore."
          textAlignment="heading-light"
          textColor=""
        />
        <div className="row">
          <CounterUpSafeSearch
            colSize="col-lg-3 col-6"
            layoutStyle=""
            evenTopMargin=""
          />
        </div>
      </div>
    </div>
  );
};

export default CounterUpOne;
