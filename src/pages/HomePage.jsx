import axios from "axios";
import { useEffect, useState } from "react";
import Page from "../components/Page";

import { apiGetMovies } from "../services/api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const request = axios.CancelToken.source();
    async function getMovies() {
      try {
        const response = await apiGetMovies({ cancelToken: request.token });
        setMovies(response.data);
      } catch (e) {
        console.log(e);
      }
    }

    getMovies();
    return () => {
      request.cancel();
    };
  }, []);

  return (
    <Page title="Home">
      <h1>All movies</h1>
      {movies.map((m) => (
        <div key={m.id}>
          <p>
            {m.name} - {m.year}
          </p>
          <p>{m.genre}</p>
          <p>{m.rating} stars</p>
        </div>
      ))}
    </Page>
  );
};

export default HomePage;
