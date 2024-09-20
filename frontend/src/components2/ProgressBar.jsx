import React, { useState } from "react";
import { gsap } from "gsap";

const ProgressBar = ({ progress }) => {
  const progressBarRef = React.useRef(null);

  React.useEffect(() => {
    gsap.to(progressBarRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power1.out",
    });
  }, [progress]);

  return (
    <div className="progress-bar-container">
      <div ref={progressBarRef} className="progress-bar"></div>
    </div>
  );
};

export default ProgressBar;
