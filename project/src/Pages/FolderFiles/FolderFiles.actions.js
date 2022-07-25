import axios from "axios";
import { urls } from "../../Config";

export const getFolderTree = async (
  user,
  repository,
  path,
  setFolderTree,
  setIsLoading
) => {
  setIsLoading(true);
  try {
    await axios
      .get(`${urls.repos}/${user}/${repository}/contents/${path}`)
      .then((response) => {
        setFolderTree(response.data);
        setIsLoading(false);
      });
  } catch (err) {
    console.log(err);
  }
};
