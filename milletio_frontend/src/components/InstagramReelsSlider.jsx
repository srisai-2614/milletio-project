import { useEffect, useRef, useState } from "react";
import "../styles/InstagramReelsSlider.css";

import reel1 from "../pages/assets/Reel-1.mp4";
import reel2 from "../pages/assets/Reel-2.mp4";
import reel3 from "../pages/assets/Reel-3.mp4";
import reel4 from "../pages/assets/Reel-4.mp4";
import reel5 from "../pages/assets/Reel-5.mp4";

const reels = [
  { video: reel1, label: "Foxtail Millet Upma" },
  { video: reel2, label: "Spinach Daliya Khichdi" },
  { video: reel3, label: "Golden Payasa" },
  { video: reel4, label: "Low-Fat Paneer Bites" },
  { video: reel5, label: "Power-Packed Breakfast" },
];


const ReelSection = () => {
  const videoRefs = useRef([]);
  const [mutedStates, setMutedStates] = useState(reels.map(() => true));

  const toggleMute = (index) => {
    const updatedStates = [...mutedStates];
    updatedStates[index] = !updatedStates[index];
    setMutedStates(updatedStates);

    if (videoRefs.current[index]) {
      videoRefs.current[index].muted = updatedStates[index];
    }
  };

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.addEventListener("mouseenter", () => video.play());
        video.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
        });
      }
    });
  }, []);

  return (
    <section className="reel-section">
      <h2 className="reel-title">Watch Our Reels</h2>
      <div className="reel-scroll-container">
        {reels.map((reel, idx) => (
          <div className="reel-card" key={idx}>
            <div className="video-container">
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={reel.video}
                muted={mutedStates[idx]}
                playsInline
                preload="metadata"
                className="reel-video"
              />
              <button className="mute-btn" onClick={() => toggleMute(idx)}>
                {mutedStates[idx] ? "🔇" : "🔊"}
              </button>
            </div>
            <p className="reel-label">{reel.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReelSection;

const InstagramReelsSlider = () => {
  useEffect(() => {
    const videos = document.querySelectorAll(".reel-video");
    videos.forEach((video) => {
      video.addEventListener("mouseenter", () => video.play());
      video.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
    });
  }, []);

  return (
    <section className="reel-section">
      <h2 className="reel-title">Watch Our Reels</h2>
      <div className="reel-scroll-container">
        {reels.map((reel, idx) => (
          <div className="reel-card" key={idx}>
            <div className="video-container">
              <video
                src={reel.video}
                playsInline
                preload="metadata"
                className="reel-video"
              />
            </div>
            <p className="reel-label">{reel.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

