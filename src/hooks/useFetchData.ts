import { useEffect, useState } from "react";

export const useFetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const url =
    "https://spotify23.p.rapidapi.com/search/?q=post%20malone&type=playlists&offset=0&limit=5&numberOfTopResults=5";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "a91b99972dmshc23e3cb77d5cc22p184838jsn7329793cc1d9",
      "x-rapidapi-host": "spotify23.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      console.log(JSON.stringify(result));
    } catch (error) {
      console.error(error);
    }
  };
};
