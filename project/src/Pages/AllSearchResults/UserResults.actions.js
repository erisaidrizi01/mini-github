import { urls } from "../../Config";
import axios from "axios";

export const getUsersData = async (
  searchVal,
  setLoading,
  setUsersResults,
  page,
  setTotalPages,
  per_page
) => {
  try {
    await axios
      .get(
        `${urls.searchUsers}?q=${searchVal}&page=${page}&per_page=${per_page}`
      )
      .then((response) => {
        const total = Math.ceil(response.data.total_count / 10);
        setTotalPages(total);
        setLoading(false);
        setUsersResults(response.data.items);
      });
  } catch (err) {
    console.log(err);
  }
};
