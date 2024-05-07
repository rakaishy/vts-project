import axios from "axios";

const categoriesApi = axios.create({
  baseUrl: "http://localhost:3000/categories",
});

export default categoriesApi;
