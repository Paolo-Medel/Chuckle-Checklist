export const saveJoke = async (joke) => {
  const objectConversion = { text: joke, told: false };

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectConversion),
  };

  const response = await fetch("http://localhost:8088/jokes", postOptions);
};

export const getAllJokes = async () => {
  return fetch("http://localhost:8088/jokes").then((res) => res.json());
};

export const editJoke = async (jokeObj) => {
  if (jokeObj.told) {
    jokeObj.told = false;
  } else {
    jokeObj.told = true;
  }

  const putOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jokeObj),
  };

  const response = await fetch(
    `http://localhost:8088/jokes/${jokeObj.id}`,
    putOptions
  );
};

export const deleteJoke = async (jokeObj) => {
  const deleteOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jokeObj),
  };

  const response = await fetch(
    `http://localhost:8088/jokes/${jokeObj.id}`,
    deleteOptions
  );
};
