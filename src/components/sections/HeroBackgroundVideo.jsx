"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";

/**
 * Full-bleed muted hero loop. Still image stays as LCP poster / reduced-motion fallback.
 */
export default function HeroBackgroundVideo({ hero }) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const canPlayVideo = Boolean(hero.videoPath) && !reduceMotion && !failed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPlayVideo) return undefined;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    tryPlay();

    const onVisibility = () => {
      if (document.hidden) {
        video.pause();
        setPlaying(false);
      } else {
        tryPlay();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          setPlaying(false);
        } else if (!document.hidden) {
          tryPlay();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, [canPlayVideo]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
      return;
    }
    try {
      video.muted = true;
      await video.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className="absolute inset-0">
      <Image
        src={hero.path}
        alt={hero.alt}
        width={hero.width}
        height={hero.height}
        priority
        fetchPriority="high"
        sizes="100vw"
        className={`h-full w-full object-cover object-[70%_42%] transition-opacity duration-500 ${
          canPlayVideo && playing ? "opacity-0" : "opacity-100"
        }`}
      />

      {canPlayVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-[70%_42%]"
          poster={hero.path}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          aria-hidden="true"
          onError={() => setFailed(true)}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={hero.videoPath} type={hero.videoMime || "video/mp4"} />
        </video>
      ) : null}

      {canPlayVideo ? (
        <button
          type="button"
          onClick={togglePlayback}
          className="absolute right-4 bottom-4 z-20 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-white/25 bg-deep/55 px-3 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:border-lime hover:text-lime md:right-6 md:bottom-6"
          aria-label={playing ? "Pause background video" : "Play background video"}
        >
          {playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{playing ? "Pause" : "Play"}</span>
        </button>
      ) : null}
    </div>
  );
}
