import axios from "axios";
import { content } from "../../Config";
export const getCodeFile = async (
  user,
  repository,
  path,
  setCode,
  setIsLoading
) => {
  try {
    await axios
      .get(`${content}/${user}/${repository}/master/${path}`)
      .then((response) => {
        setIsLoading(false);
        var jsonVar = JSON.stringify(response.data);
        setCode(jsonVar);
      });
  } catch (err) {
    console.log(err);
  }
};
