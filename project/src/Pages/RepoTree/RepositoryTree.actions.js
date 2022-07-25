import axios from "axios";
import { urls } from "../../Config";

export const findRepo = async (login, name, setIsLoading, setFound) => {
  console.log("ckemi");
  setIsLoading(true);
  try {
    await axios.get(`${urls.repos}/${login}/${name}`).then((response) => {
      console.log("a vij ktu?");
      if (response !== undefined) {
        setFound("found");
      }
      setIsLoading(false);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRepoDefault_branch = async (
  login,
  name,
  setDefaultBranch,
  setFound,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    await axios
      .get(`${urls.repos}/${login}/${name}`)
      .then((response) => {
        setDefaultBranch(response.data.default_branch);
      })
      .then(() => setFound(true));
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    setFound(false);
  }
};

export const getAuthRepoTree = async (
  login,
  name,
  defaultBranch,
  setRepoTree,
  setError,
  setIsLoading
) => {
  setIsLoading(true);
  try {
    await axios
      .get(`${urls.repos}/${login}/${name}/git/trees/${defaultBranch}`)
      .then((response) => {
        setIsLoading(false);
        setRepoTree(response.data.tree);
        console.log("si eshte response", response);
      });
  } catch (err) {
    setError(err.message);
  }
};
