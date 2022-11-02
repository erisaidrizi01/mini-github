import axios from "axios";
import { urls } from "../../Config";

export const getNewRepository = async (
  repositoryName,
  repoType,
  description
) => {
  try {
    await axios
      .post(urls.userRepos, {
        name: repositoryName,
        description: description,
        public: repoType,
      })
      .then((response) => console.log("i created this new repos", response));
  } catch (err) {
    console.log(err);
  }
};
