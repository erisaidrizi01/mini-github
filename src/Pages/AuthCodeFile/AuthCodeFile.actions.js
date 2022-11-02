import axios from "axios";

export const getCodeFile = async (
  user,
  repository,
  path,
  setCode,
  setIsLoading
) => {
  try {
    await axios
      .get(
        `https://raw.githubusercontent.com/${user}/${repository}/main/${path}`
      )
      .then((response) => {
        setIsLoading(false);
        var jsonVar = JSON.stringify(response.data);
        return setCode(jsonVar);
      });
  } catch (err) {
    console.log("An error accurred", err);
  }
};
