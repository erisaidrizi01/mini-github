import axios from "axios";
import { urls } from "../../Config";

// export const getTotalPages = async (login, setTotalPages) => {
//   try {
//     await axios.get(`${urls.userRepos}`).then((response) => {
//       const total = Math.ceil(response.data.length / 3);
//       return setTotalPages(total);
//     });
//   } catch (err) {
//     alert(err);
//   }
// };

export const getRepositories = async (page, setRepositories, setIsLoading) => {
  setIsLoading(true);
  try {
    await axios
      .get(`${urls.userRepos}?page=${page}&per_page=5`)
      .then((response) => {
        setIsLoading(false);
        if (response !== undefined) {
          setRepositories(response.data);
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const getOtherRepositories = async (
  url,
  page,
  setRepositories,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    await axios.get(`${url}?page=${page}&per_page=5`).then((response) => {
      setIsLoading(false);
      return setRepositories(response.data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFollowingData = async (userLogin, setBtnTitle) => {
  try {
    await axios.get(`${urls.following}`).then((response) => {
      const isFollowing = response.data.some(
        (user) => user["login"] === userLogin
      );

      if (!isFollowing) {
        setBtnTitle("Follow");
      } else {
        setBtnTitle("Unfollow");
      }
    });
  } catch (err) {
    if (err.message === "Not Found") {
      console.log(err.message);
    }
  }
};

export const unfollowUser = async (name) => {
  try {
    await axios.delete(`${urls.following}/${name}`);
  } catch (err) {
    console.log("err", err);
  }
};

export const followUser = async (name) => {
  try {
    await axios.put(`${urls.following}/${name}`);
  } catch (err) {
    console.log("err", err);
  }
};

export const getFollowingUsers = async (followingUrl, setFollowingList) => {
  console.log("marina");
  try {
    await axios.get(`${followingUrl}`).then((res) => {
      setFollowingList(res.data);
    });
  } catch (err) {
    console.log("error", err);
  }
};

export const getFollowers = async (
  followersUrl,
  setFollowers,
  setIsLoading,
  page
) => {
  setIsLoading(true);

  try {
    await axios
      .get(`${followersUrl}?page=${page}&per_page=5`)
      .then((response) => {
        setFollowers(response.data);
        setIsLoading(false);
      });
  } catch (err) {
    console.log("error", err);
  }
};

export const getStarredRepos = async (
  starredUrl,
  setStarredReposList,
  setIsLoading,
  page
) => {
  setIsLoading(true);
  try {
    await axios.get(`${starredUrl}?page=${page}`).then((response) => {
      setIsLoading(false);
      setStarredReposList(response.data);
    });
  } catch (err) {
    alert(err);
  }
};
