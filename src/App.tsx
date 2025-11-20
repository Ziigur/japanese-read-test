import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

type Question = { char: string; romaji: string };

const quiz: Question[] = [
  { char: "あ", romaji: "a" },
  { char: "い", romaji: "i" },
  { char: "う", romaji: "u" },
  { char: "え", romaji: "e" },
  { char: "お", romaji: "o" },
  { char: "か", romaji: "ka" },
  { char: "き", romaji: "ki" },
  { char: "く", romaji: "ku" },
  { char: "け", romaji: "ke" },
  { char: "こ", romaji: "ko" },
  { char: "さ", romaji: "sa" },
  { char: "し", romaji: "shi" },
  { char: "す", romaji: "su" },
  { char: "せ", romaji: "se" },
  { char: "そ", romaji: "so" },
  { char: "た", romaji: "ta" },
  { char: "ち", romaji: "chi" },
  { char: "つ", romaji: "tsu" },
  { char: "て", romaji: "te" },
  { char: "と", romaji: "to" },
  { char: "な", romaji: "na" },
  { char: "に", romaji: "ni" },
  { char: "ぬ", romaji: "nu" },
  { char: "ね", romaji: "ne" },
  { char: "の", romaji: "no" },
  { char: "は", romaji: "ha" },
  { char: "ひ", romaji: "hi" },
  { char: "ふ", romaji: "fu" },
  { char: "へ", romaji: "he" },
  { char: "ほ", romaji: "ho" },
  { char: "ま", romaji: "ma" },
  { char: "み", romaji: "mi" },
  { char: "む", romaji: "mu" },
  { char: "め", romaji: "me" },
  { char: "も", romaji: "mo" },
  { char: "や", romaji: "ya" },
  { char: "ゆ", romaji: "yu" },
  { char: "よ", romaji: "yo" },
  { char: "ら", romaji: "ra" },
  { char: "り", romaji: "ri" },
  { char: "る", romaji: "ru" },
  { char: "れ", romaji: "re" },
  { char: "ろ", romaji: "ro" },
  { char: "わ", romaji: "wa" },
  { char: "を", romaji: "o" },
  { char: "ん", romaji: "n" },
  { char: "が", romaji: "ga" },
  { char: "ぎ", romaji: "gi" },
  { char: "ぐ", romaji: "gu" },
  { char: "げ", romaji: "ge" },
  { char: "ご", romaji: "go" },
  { char: "ざ", romaji: "za" },
  { char: "じ", romaji: "ji" },
  { char: "ず", romaji: "zu" },
  { char: "ぜ", romaji: "ze" },
  { char: "ぞ", romaji: "zo" },
  { char: "だ", romaji: "da" },
  { char: "ぢ", romaji: "ji" },
  { char: "づ", romaji: "zu" },
  { char: "で", romaji: "de" },
  { char: "ど", romaji: "do" },
  { char: "ば", romaji: "ba" },
  { char: "び", romaji: "bi" },
  { char: "ぶ", romaji: "bu" },
  { char: "べ", romaji: "be" },
  { char: "ぼ", romaji: "bo" },
  { char: "ぱ", romaji: "pa" },
  { char: "ぴ", romaji: "pi" },
  { char: "ぷ", romaji: "pu" },
  { char: "ぺ", romaji: "pe" },
  { char: "ぽ", romaji: "po" },
];

const getInitialQuestionQueue = (): Question[] => {
  const queue: Question[] = [];
  while (queue.length < 5) {
    const nextIndex = Math.floor(Math.random() * quiz.length);
    if (!queue.includes(quiz[nextIndex])) {
      queue.push(quiz[nextIndex]);
    }
  }
  return queue;
};

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [text, setText] = useState("");
  const [questionQueue, setQuestionQueue] = useState(getInitialQuestionQueue());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    const handler = () => {
      setWindowHeight(window.visualViewport?.height || window.innerHeight);
      window.scrollTo(0, 0);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });

  useEffect(() => {
    if (text.toLowerCase() === questionQueue[currentIndex].romaji) {
      // Correct answer, move to next question
      let nextIndex = Math.floor(Math.random() * quiz.length);
      while (questionQueue.slice(currentIndex).includes(quiz[nextIndex])) {
        nextIndex = Math.floor(Math.random() * quiz.length);
      }
      setQuestionQueue((prev) => [...prev, quiz[nextIndex]]);
      setCurrentIndex((prev) => prev + 1);
      setText("");
    }
  }, [text, questionQueue]);

  return (
    <div
      className="w-full text-center flex flex-col items-center justify-center gap-8"
      style={{ minHeight: windowHeight }}
    >
      <p className="opacity-50">Write out the character with latin alphabet</p>
      <div className="relative h-24 overflow-hidden w-full">
        {questionQueue.length > 1 &&
          questionQueue.map((question, index) => (
            <span
              key={question.char}
              className={classNames(
                "absolute transition-all duration-500 origin-center text-6xl",
                {
                  "opacity-0 text-green-500": index < currentIndex,
                  "opacity-50": index > currentIndex,
                }
              )}
              style={{
                transform: `translateX(${
                  -50 + (index - currentIndex) * 100
                }%) scale(${index > currentIndex ? 0.5 : 1})`,
              }}
            >
              {question.char}
            </span>
          ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}

export default App;
