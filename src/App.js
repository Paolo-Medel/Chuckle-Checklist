import "./App.css";
import { useState, useEffect } from "react";
import {
  saveJoke,
  getAllJokes,
  editJoke,
  deleteJoke,
} from "./services/jokeService";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [newJoke, setJokes] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray);
    });
  }, [newJoke]);

  useEffect(() => {
    const untoldFilter = allJokes.filter((joke) => joke.told === false);
    const toldFilter = allJokes.filter((joke) => joke.told);
    setToldJokes(toldFilter);
    setUntoldJokes(untoldFilter);
  }, [allJokes]);

  const reRender = async () => {
    await getAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray);
    });
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <h2>Add New Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={newJoke}
          placeholder="New One Liner"
          onChange={(event) => {
            setJokes(event.target.value);
          }}
        />
        <button
          className="joke-input-submit"
          onClick={async () => {
            await saveJoke(newJoke);
            setJokes("");
          }}
        >
          Save Joke
        </button>
      </div>
      <div className="joke-lists-container">
        <h2>
          Untold
          <span className="untold-count"></span>
          <ul>
            {untoldJokes.map((jokes) => {
              return (
                <li className="joke-list-item" key={jokes.id}>
                  <p className="joke-list-item-text" value={jokes.id}>
                    {jokes.text}
                  </p>
                  <button
                    onClick={async () => {
                      await deleteJoke(jokes);
                      reRender();
                    }}
                  >
                    delete
                  </button>
                  <button
                    onClick={async () => {
                      await editJoke(jokes);
                      reRender();
                    }}
                  >
                    Click if Told
                  </button>
                </li>
              );
            })}
          </ul>
        </h2>
        <h2>
          Told
          <span className="told-count">
            <ul>
              {toldJokes.map((jokes) => {
                return (
                  <li className="joke-list-item" key={jokes.id}>
                    <p className="joke-list-item-text" value={jokes.id}>
                      {jokes.text}
                    </p>
                    <button
                      onClick={async () => {
                        await deleteJoke(jokes);
                        reRender();
                      }}
                    >
                      delete
                    </button>
                    <button
                      onClick={async () => {
                        await editJoke(jokes);
                        reRender();
                      }}
                    >
                      Click if Untold
                    </button>
                  </li>
                );
              })}
            </ul>
          </span>
        </h2>
      </div>
    </div>
  );
};
