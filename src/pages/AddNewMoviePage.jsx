import axios from "axios";

import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Page from "../components/Page";
import { apiAddMovie } from "../services/api";

const AddNewMoviePage = () => {
  const [isDone, setIsDone] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [movie, setMovie] = useState({
    name: "",
    year: "",
    rating: "",
    genre: [],
    image: {
      url: "",
      altInfo: "",
    },
  });

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function addMovie(payload) {
      try {
        await apiAddMovie({
          payload,
          cancelToken: request.token,
        });
        setIsDone(true);
      } catch (e) {
        console.log(e);
      } finally {
        setSubmit(false);
      }
    }

    if (submit) {
      const payload = { ...movie };
      payload.genre = payload.genre.join(",");
      addMovie(payload);
    }

    return () => request.cancel();
  }, [submit, movie]);

  function handleGenreChange(e) {
    const genre = e.target.value;

    setMovie((prev) => {
      const idx = prev.genre.indexOf(genre);
      let items = [...prev.genre];
      if (idx === -1) {
        // add
        items.push(genre);
      } else {
        // remove
        items.splice(idx, 1);
      }
      return {
        ...prev,
        genre: items,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(true);
  }

  // function f() {
  //   return {
  //     a: 1
  //   }
  // }

  // const f = () => {
  //   return {
  //     a: 1
  //   }
  // }

  // const f = () => ({a: 1})

  return isDone ? (
    <Navigate to="/" />
  ) : (
    <Page title="Add new movie">
      <h1>Add new movie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={movie.name}
            onChange={(e) =>
              setMovie((prev) => {
                const m = { ...prev };
                m.name = e.target.value;
                return m;
              })
            }
          />
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <input
            type="text"
            id="year"
            value={movie.year}
            onChange={(e) =>
              setMovie((prev) => ({
                ...prev,
                year: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <select
            name="rating"
            id="rating"
            value={movie.rating}
            onChange={(e) =>
              setMovie((prev) => ({
                ...prev,
                rating: e.target.value,
              }))
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <fieldset>
            <legend>Genre</legend>
            <input
              type="checkbox"
              name="genre"
              value="sci-fi"
              id="g-sci-fi"
              checked={movie.genre.includes("sci-fi")}
              onChange={handleGenreChange}
            />
            <label htmlFor="g-sci-fi">Sci-fi</label>
            <input
              type="checkbox"
              name="genre"
              value="thriller"
              id="g-thriller"
              checked={movie.genre.includes("thriller")}
              onChange={handleGenreChange}
            />
            <label htmlFor="g-thriller">Thriller</label>
          </fieldset>
        </div>
        <div>
          <fieldset>
            <legend>Image</legend>
            <div>
              <label htmlFor="image-url">URL</label>
              <input
                type="text"
                name="image-url"
                value={movie.image.url}
                id="image-url"
                onChange={(e) =>
                  setMovie((prev) => ({
                    ...prev,
                    image: {
                      ...prev.image,
                      url: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div>
              <label htmlFor="image-alt">Alt info</label>
              <input
                type="text"
                name="image-alt"
                value={movie.image.altInfo}
                id="image-alt"
                onChange={(e) =>
                  setMovie((prev) => ({
                    ...prev,
                    image: {
                      ...prev.image,
                      altInfo: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </fieldset>
        </div>

        <div>
          <input type="submit" value="Add movie" />
        </div>
      </form>
    </Page>
  );
};

export default AddNewMoviePage;
