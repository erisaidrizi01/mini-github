import { urls } from "../../Config";
import axios from "axios";
import { actionTypes } from "../../Redux/Reducers/index";

export const getFollowing = async (
  following_url,
  setFollowing,
  page,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    await axios.get(`${following_url}?page=${page}&per_page=5`).then((res) => {
      setFollowing(res.data);
      setIsLoading(false);
    });
  } catch (err) {
    console.log("error", err);
  }
};

export const getFollowingListData = (followingList) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_FOLLOWING,
      payload: followingList,
    });
  };
};

export const getSignInData = (token) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SIGNIN_LOADING,
    });

    axios
      .get(`${urls.url}`, {
        auth: {
          username: "Basic",
          password: token,
        },
      })
      .then((response) => {
        if (response.data.login) {
          localStorage.setItem("token", token);
          if (response.status === 200) {
            console.log("Logged in Successfully");
            // navigate("/profile");
          }
          return response.data;
        } else {
          alert(response.data.message);
        }
      })
      .then((data) => {
        dispatch({
          type: actionTypes.SIGNIN_SUCCESS,
          payload: {
            data: data,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.SIGNIN_ERROR,
          payload: "Wrong password!",
        });
        // debugger;
      });
  };
};

export const updateFollowingData = (updatedFollowingList) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_FOLLOWING,
      payload: updatedFollowingList,
    });
  };
};

export const getSignOutData = () => {
  console.log("erdha");
  return (dispatch) => {
    localStorage.clear();

    dispatch({
      type: actionTypes.USER_LOGOUT,
    });
  };
};
