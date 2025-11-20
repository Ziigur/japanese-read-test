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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    if (text === questionQueue[0].romaji) {
      // Correct answer, move to next question
      setIsAnimating(true);
      
      setTimeout(() => {
        let nextIndex = Math.floor(Math.random() * quiz.length);
        while (questionQueue.includes(quiz[nextIndex])) {
          nextIndex = Math.floor(Math.random() * quiz.length);
        }
        setQuestionQueue((prev) => [...prev.slice(1), quiz[nextIndex]]);
        setText("");
        setTimeout(() => setIsAnimating(false), 50);
      }, 300);
    }
  }, [text, questionQueue]);

  return (
    <div className="min-h-svh text-center flex flex-col items-center justify-center gap-8 p-4">
      <p className="opacity-50">Write out the character with latin alphabet</p>
      <div className="flex items-center justify-center overflow-hidden relative">
        {questionQueue.map((question, index) => (
          <span
            key={question.char + question.romaji}
            style={{
              animation: isAnimating 
                ? index === 0 
                  ? 'fadeOutLeft 0.3s ease-out forwards' 
                  : index === questionQueue.length - 1 
                    ? 'slideInFromRight 0.5s ease-out'
                    : index === 1
                      ? 'scaleUp 0.5s ease-out'
                      : 'none'
                : 'none'
            }}
            className={`transition-all duration-500 ease-in-out ${
              index === 0
                ? "text-8xl"
                : "text-4xl opacity-50 ml-4"
            }`}
          >
            {question.char}
          </span>
        ))}
      </div>
      <div className="card">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default App;
