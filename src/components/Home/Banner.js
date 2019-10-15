import React from 'react';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className="homePage">
      <section className="showcase">
        <div className="col-md-12 showcase-bg">
          <p className="showcase-text">
            Be part of an OM campaign through your gift of good will
          </p>
        </div>
        <div className="showcase-img">       
        </div>
      </section>
    </div>  
  );
};

export default Banner;
