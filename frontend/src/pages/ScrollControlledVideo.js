import React from "react";
import { Controller, Scene } from "react-scrollmagic";
import video from "../video.mp4";
import { BlackVideoFilm } from "../components/UI/BlackVideoFilm";
import { VideoCenteredHeading } from "../components/Typography/VideoCenteredHeading";
import CornerLights from "../components/UI/CornerLights";

const ScrollControlledVideo = () => {
  const handleChange = (progress) => {
    const vid = document.querySelector("#video");
    if (vid) {
      const targetTime = progress * 7.6;
      const currentTime = vid.currentTime;
      const difference = targetTime - currentTime;
      const easing = 0.1; // Adjust this value to control the smoothness

      const newTime = currentTime + difference * easing;
      vid.currentTime = newTime;
    }
  };

  const getMatter = (progress) => {
    let matter;
    if (progress < 0.33) {
      matter = "Future is Coming";
    } else if (progress < 0.66) {
      matter = "Are you ready";
    } else {
      matter = "Experience the Future";
    }
    return matter;
  };
  return (
    <div>
      <Controller>
        <Scene
          duration={9000} // Adjust this duration based on your content
          pin
          triggerHook="onLeave"
        >
          {(progress) => {
            handleChange(progress);

            return (
              <div
                style={{
                  height: "100vh",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                  }}
                >
                  <CornerLights />

                  <BlackVideoFilm />
                  <video
                    id="video"
                    preload="auto"
                    style={{
                      width: "100%",
                      height: "100vh",
                      display: "block",
                      objectFit: "cover",
                    }}
                  >
                    <source src={video} type="video/mp4" />
                  </video>
                </div>
                <div>
                  <VideoCenteredHeading>
                    {getMatter(progress)}
                  </VideoCenteredHeading>
                </div>
              </div>
            );
          }}
        </Scene>
      </Controller>
      <div className="" style={{ height: "100vh" }}></div>
    </div>
  );
};

export default ScrollControlledVideo;
