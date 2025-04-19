"use client";
import { useRef, useState, useEffect } from "react";

const songs = [
  {
    title: "Kagefumi",
    artist: "百景",
    src: "/songs/kagefumi.mp3",
    cover: "/covers/kagefumi.jpg",
    background: "#9f000e",
    artistColor: "#ffbdb4",
    progressBarColor: "#610000",
  },
  {
    title: "owesome",
    artist: "a picture of her",
    src: "/songs/owesome.mp3",
    cover: "/covers/owesome.jpg",
    background: "#797e57",
    artistColor: "#cdcdcd",
    progressBarColor: "#494c34",
  },
  {
    title: "まほうのじゅうたん",
    artist: "百景",
    src: "/songs/まほうのじゅうたん.mp3",
    cover: "/covers/まほうのじゅうたん.jpg",
    background: "#645100",
    artistColor: "#e8cc55",
    progressBarColor: "#413000",
  },
  {
    title: "Springboard",
    artist: "Just Neighbors",
    src: "/songs/springboard.mp3",
    cover: "/covers/springboard.jpg",
    background: "#4b4d3b",
    artistColor: "#aeaba2",
    progressBarColor: "#323425",
  },
  {
    title: "-２℃",
    artist: "百景",
    src: "/songs/-2.mp3",
    cover: "/covers/-2.jpg",
    background: "#9f000e",
    artistColor: "#ffbdb4",
    progressBarColor: "#610000",
  },
  {
    title: "I do still wrong",
    artist: "toe",
    src: "/songs/i-do-still-wrong.mp3",
    cover: "/covers/i-do-still-wrong.jpg",
    background: "#13435e",
    artistColor: "#98b3c4",
    progressBarColor: "#122f44",
  },
  {
    title: "ほんをよむ",
    artist: "百景",
    src: "/songs/ほんをよむ.mp3",
    cover: "/covers/ほんをよむ.jpg",
    background: "#645100",
    artistColor: "#e8cc55",
    progressBarColor: "#413000",
  },
  {
    title: "7×7",
    artist: "百景",
    src: "/songs/7x7.mp3",
    cover: "/covers/7x7.jpg",
    background: "#9f000e",
    artistColor: "#ffbdb4",
    progressBarColor: "#610000",
  },
  {
    title: "Advances, None ...",
    artist: "Just Neighbors",
    src: "/songs/advances-none-miraculous.mp3",
    cover: "/covers/advances-none-miraculous.jpg",
    background: "#52636c",
    artistColor: "#9ca8b0",
    progressBarColor: "#324049",
  },
];

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentSong = songs[index];

  const play = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    isPlaying ? pause() : play();
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % songs.length);
    setProgress(0);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  const seek = (percent: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = percent * audio.duration;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnd = () => next();

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", handleEnd);
    };
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play().catch(() => {});
    }
  }, [index]);

  return {
    audioRef,
    currentSong,
    isPlaying,
    progress,
    play,
    pause,
    toggle,
    next,
    prev,
    seek,
  };
}
