import axios from "axios";
import { urls } from "../../Config";

export const deleteRepository = async (login, name, setIsLoading) => {
  setIsLoading(true);
  try {
    await axios
      .delete(`${urls.repos}/${login}/${name}`)
      .then(() => setIsLoading(false));
  } catch (err) {
    console.log(err);
  }
};
