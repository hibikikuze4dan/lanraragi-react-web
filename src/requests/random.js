import axios from "axios";
import { HEADERS, SEARCH_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";

const data = "";

const config = {
  method: "get",
  url: `http://${getBaseUrl()}${SEARCH_URL}?count=10`,
  headers: HEADERS,
  data,
};

export const getRandomArchives = async () =>
  axios(config)
    .then((response) => response.data.data)
    .catch((error) => {
      console.log(error);
    });

// const myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer cGVyc29uYTRkYW4=");
// myHeaders.append("Referrer-Policy", "origin");
// myHeaders.append("Access-Control-Allow-Origin", "*");
// const raw = "";

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow",
// };

// export const getRandomArchives = async () =>
//   fetch("http://192.168.0.204:3000/api/search/random?count=10", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log("error", error));

export default getRandomArchives;
