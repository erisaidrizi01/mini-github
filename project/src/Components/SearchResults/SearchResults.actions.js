import axios from "axios";
import { urls } from "../../Config";

export const getUsers = async (input, setSearchResults, setIsLoading) => {
  setIsLoading(true);
  try {
    await axios
      .get(`${urls.searchUsers}?q=${input}&page=1&per_page=5`)
      .then((response) => {
        setIsLoading(false);
        setSearchResults(response.data.items);
      });
  } catch (err) {
    console.log("error", err);
  }
};
