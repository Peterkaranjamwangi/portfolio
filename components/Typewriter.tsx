"use client";


import React, { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  delay?: number;
  eraseDelay?: number;
  pauseDelay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  words,
  delay = 100,
  eraseDelay = 50,
  pauseDelay = 2000,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        timer = setTimeout(() => {}, pauseDelay);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, eraseDelay);
      }
    } else {
      if (currentText === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      } else {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, delay);
      }
    }

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    delay,
    eraseDelay,
    pauseDelay,
  ]);

  return <span>{currentText}</span>;
};

export default Typewriter;
