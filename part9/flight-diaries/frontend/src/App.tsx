import React, { useEffect, useState } from "react";
import { createDiary, getAllDiaries } from "./services/diariesServices";
import { DiaryType } from "./types";
import { DiaryRecord } from "./components/DiaryRecord";
import { generateRandomId } from "./helper/idGeneratorHelper";
import axios from "axios";

function App() {
  const [diaries, setDiaries] = useState<Omit<DiaryType, "comment">[]>([
    {
      date: "NA",
      id: 404,
      visibility: "NA",
      weather: "NA",
    },
  ]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleAddDiary = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const date = form.dateInput.value;
    const visibility = (form.querySelector('input[name="visibilityInput"]:checked') as HTMLInputElement)?.value;
    const weather = (form.querySelector('input[name="weatherInput"]:checked') as HTMLInputElement)?.value;
    const comment = form.commentInput.value;

    const newDiary = {
      date,
      visibility,
      weather,
      comment,
      id: generateRandomId(),
    };

    createDiary(newDiary)
      .then((response) => {
        setDiaries(diaries.concat(response));
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error)) {
          console.error(error.response);
          setErrorMsg(error.response?.data);
        } else {
          console.error("Unexpected error", error);
          setErrorMsg("An unexpected error occurred");
        }
      });
  };

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <>
      <form onSubmit={handleAddDiary}>
        <h3>Add new entry</h3>
        <p style={{ color: "red" }}>{errorMsg}</p>
        <div>
          <label htmlFor="dateInput">date</label>
          <input type="date" name="dateInput" id="dateInput" />
        </div>
        <div>
          <label htmlFor="visibilityInput" style={{ marginRight: "10px" }}>
            visibility
          </label>

          <span>
            <label htmlFor="visibilityInputGreat">great</label>
            <input
              type="radio"
              name="visibilityInput"
              id="visibilityInputGreat"
              value="great"
            />
          </span>

          <span>
            <label htmlFor="visibilityInputGood">good</label>
            <input
              type="radio"
              name="visibilityInput"
              id="visibilityInputGood"
              value="good"
            />
          </span>

          <span>
            <label htmlFor="visibilityInputOk">ok</label>
            <input
              type="radio"
              name="visibilityInput"
              id="visibilityInputOk"
              value="ok"
            />
          </span>

          <span>
            <label htmlFor="visibilityInputPoor">poor</label>
            <input
              type="radio"
              name="visibilityInput"
              id="visibilityInputPoor"
              value="poor"
            />
          </span>
        </div>

        <div>
          <label htmlFor="weatherInput" style={{ marginRight: "10px" }}>
            weather
          </label>
          <span>
            <label htmlFor="weatherInputSunny">sunny</label>
            <input
              type="radio"
              name="weatherInput"
              id="weatherInputSunny"
              value="sunny"
            />
          </span>

          <span>
            <label htmlFor="weatherInputRainy">rainy</label>
            <input
              type="radio"
              name="weatherInput"
              id="weatherInputRainy"
              value="rainy"
            />
          </span>

          <span>
            <label htmlFor="weatherInputCloudy">cloudy</label>
            <input
              type="radio"
              name="weatherInput"
              id="weatherInputCloudy"
              value="cloudy"
            />
          </span>

          <span>
            <label htmlFor="weatherInputStormy">stormy</label>
            <input
              type="radio"
              name="weatherInput"
              id="weatherInputStormy"
              value="stormy"
            />
          </span>

          <span>
            <label htmlFor="weatherInputWindy">windy</label>
            <input
              type="radio"
              name="weatherInput"
              id="weatherInputWindy"
              value="windy"
            />
          </span>
        </div>

        <div>
          <label htmlFor="commentInput">comment</label>
          <input type="text" name="commentInput" id="commentInput" />
        </div>
        <button type="submit">add</button>
      </form>
      <div>
        <h3>Diary entries</h3>
        {diaries.map((diary) => (
          <DiaryRecord diary={diary} key={diary.id} />
        ))}
      </div>
    </>
  );
}

export default App;
