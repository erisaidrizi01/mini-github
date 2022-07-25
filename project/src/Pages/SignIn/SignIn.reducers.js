import { actionTypes } from "../../Redux/Reducers/index";

export const signin = (
  state = {
    loading: false,
    data: {},
    followingList: [],
    repositoriesList: [],
    starredReposList: [],
    error: null,
  },
  { type, payload }
) => {
  switch (type) {
    case actionTypes.PROFILE_LOADING:
      return { ...state, loading: true, error: null };
    case actionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload.data,
        // followingList: payload.followingList,
        error: null,
      };

    case actionTypes.SIGNIN_ERROR:
      return {
        ...state,
        loading: false,
        data: {},
        followingList: [],
        repositoriesList: [],
        starredReposList: [],
        error: payload,
      };

    case actionTypes.UPDATE_STARRED:
      console.log("arrived starres", payload);
      return {
        ...state,
        starredReposList: payload,
      };

    case actionTypes.UPDATE_FOLLOWING:
      console.log("arrived at update following", payload);
      return {
        ...state,
        followingList: payload,
      };

    case actionTypes.UPDATE_REPOSITORIES:
      console.log("arrived at repositories", payload);
      return {
        ...state,
        repositoriesList: [...state.repositoriesList, ...payload],
      };

    case actionTypes.USER_LOGOUT:
      console.log("arrived at user_logout");
      return {
        data: {},
        followingList: [],
        repositoriesList: [],
        starredReposList: [],
        error: null,
      };
    default:
      return state;
  }
};
