import React, { useState, useEffect } from "react";
import "./songQuestion.css";

const GIVE_YEAR_2 = "giveYear2";
const GIVE_YEAR_4 = "giveYear4";
const BEFORE_AFTER_2000 = "beforeAfter2000";
const DECADE = "decade";
const SongWidget = ({ song, onAnswer }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [inputType, setInputType] = useState(""); // 'year' or 'beforeAfter'
  const [answerStatus, setAnswerStatus] = useState(undefined); // 'right' or 'wrong'

  const questionTypes = [BEFORE_AFTER_2000, GIVE_YEAR_2, GIVE_YEAR_4, DECADE];

  useEffect(() => {
    const randomQuestion =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];
    askQuestion(randomQuestion);
  }, []);

  const askQuestion = (questionType) => {
    setUserAnswer("");
    setAnswerStatus(undefined);
    if (questionType === BEFORE_AFTER_2000) {
      setQuestion({
        label: "Is the release year before or after 2000?",
        type: questionType,
      });
      setInputType("beforeAfter");
    } else if (questionType === GIVE_YEAR_4) {
      setQuestion({
        label: "Give the release year (+/-4 years)?",
        type: questionType,
      });
      setInputType("year");
    } else if (questionType === GIVE_YEAR_2) {
      setQuestion({
        label: "Give the release year (+/-2 years)?",
        type: questionType,
      });
      setInputType("year");
    } else if (questionType === DECADE) {
      setQuestion({
        label:
          "Give a year and check if the song was released in that decade (...,1980, 1990, 2000,...).",
        type: questionType,
      });
      setInputType("year");
    }
  };

  const handleBeforeAfter = (answer) => {
    setUserAnswer(answer);
    const correct =
      (answer === "before" && song.releaseYear < 2000) ||
      (answer === "after" && song.releaseYear >= 2000);
    setAnswerStatus(correct ? "right" : "wrong");
    if (onAnswer) {
      onAnswer(correct, song);
    }
  };

  const handleYearInput = () => {
    if (inputType === "year") {
      let correct = false;
      if (question.type == DECADE) {
        const decadeStart = Math.floor(userAnswer / 10) * 10;
        const decadeEnd = decadeStart + 9;
        correct =
          decadeStart <= parseInt(song.releaseYear) &&
          parseInt(song.releaseYear) <= decadeEnd;
      } else if (question.type === GIVE_YEAR_4) {
        correct =
          Math.abs(parseInt(song.releaseYear) - parseInt(userAnswer)) <= 4;
      } else if (question.type === GIVE_YEAR_2) {
        correct =
          Math.abs(parseInt(song.releaseYear) - parseInt(userAnswer)) <= 2;
      }
      setAnswerStatus(correct ? "right" : "wrong");

      if (onAnswer) {
        onAnswer(answerStatus === "right", song);
      }
    }
  };

  return (
    <div className="song-widget">
      {answerStatus && (
        <div>
          <h2>{song.title}</h2>
          <h3>{song.artist}</h3>
          <p>{song.description}</p>
          <p>
            <span style={{ fontSize: "50px" }}>
              <b>{song.releaseYear}</b>
            </span>
          </p>
        </div>
      )}

      {question && answerStatus == undefined && (
        <div className="question-container">
          <p>{question.label}</p>
          {inputType === "beforeAfter" ? (
            <div className="button-container">
              <button
                className="answer-button"
                onClick={() => handleBeforeAfter("before")}
              >
                Before
              </button>
              <button
                className="answer-button"
                onClick={() => handleBeforeAfter("after")}
              >
                After
              </button>
            </div>
          ) : (
            <div className="input-container">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleYearInput();
                }}
              >
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="big-input"
                  placeholder="Enter a year"
                />
                <button className="submit-button" onClick={handleYearInput}>
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {answerStatus && (
        <div>
          <div className={`answer-status ${answerStatus}`}>
            {answerStatus === "right" ? "Right" : "Wrong"}
          </div>
          <p style={{ color: "black" }}>{question.label}</p>
          <b style={{ color: "black" }}>Your answer was : {userAnswer}</b>
        </div>
      )}
    </div>
  );
};

export default SongWidget;
