import axios from "axios";
import { urls } from "../../Config";

export const getUserData = async (userLogin, setUser, setIsLoading) => {
  try {
    setIsLoading(true);
    await axios.get(`${urls.usersUrl}/${userLogin} `).then((res) => {
      setUser(res.data);

      setIsLoading(false);
    });
  } catch (err) {
    console.log(err);
  }
};
