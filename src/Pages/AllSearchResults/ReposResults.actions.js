import { urls } from "../../Config";
import axios from "axios";

export const getData = async (
  searchVal,
  setLoading,
  setReposResults,
  page,
  setTotalPages,
  per_page
) => {
  try {
    await axios
      .get(
        `${urls.searchReposUrl}?q=${searchVal}&page=${page}&per_page=${per_page}`
      )
      .then((response) => {
        const total = Math.ceil(response.data.total_count / 10);

        setTotalPages(total);
        setLoading(false);
        setReposResults(response.data.items);
      });
  } catch (err) {
    console.log("kemi nje error,", err);
  }
};
