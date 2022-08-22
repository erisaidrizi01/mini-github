import { Routes, Route } from "react-router-dom";
import First from "./Pages/First/First";
import SignIn from "./Pages/SignIn/index";
import Profile from "./Pages/Profile/index";
import Navigationbar from "./Components/Navigationbar/Navigationbar";
import ProtectedRoutes from "./ProtectedRoutes";
import ProtectSignIn from "./ProtectSignIn";
import AllSearchResults from "./Pages/AllSearchResults/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSignInData } from "./Pages/SignIn/SignIn.actions";
import React from "react";
import NewRepository from "./Pages/NewRepository/index";
import CodeFile from "./Pages/CodeFile/index";
import RepositoryTree from "./Pages/RepoTree/RepositoryTree";
import AuthCodeFile from "./Pages/AuthCodeFile/AuthCodeFile";
import { history } from "./Network";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import FolderFiles from "./Pages/FolderFiles/index";
import { Settings } from "./Pages/Settings/Settings";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const userName = useSelector((state) => state.signin.data.login);

  useEffect(() => {
    if (token !== null && !userName) {
      dispatch(getSignInData(token));
    }
  }, [token]);

  return (
    <HistoryRouter history={history}>
      <Navigationbar />
      <Routes>
        <Route exact path="/" element={<First />} />
        <Route exact path="/search" element={<AllSearchResults />} />

        <Route element={<ProtectSignIn userName={userName} />}>
          <Route exact path="/signin" element={<SignIn />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route exact path="/profile/:login" element={<Profile />} />
          <Route exact path="/newrepository" element={<NewRepository />} />
        </Route>

        {/* <Route
          exact
          path="/:user/:repository/tree/master/:path"
          element={<CodeFile />}
        /> */}

        <Route
          exact
          path="/:user/:repository/tree/main/:path"
          element={<AuthCodeFile />}
        />
        <Route
          exact
          path="/:user/:repository/tree/master/folder/:path"
          element={<CodeFile />}
        />
        <Route
          exact
          path="/:user/repository/:repository/:path"
          element={<FolderFiles />}
        />
        <Route
          exact
          path="/:login/repository/:name"
          element={<RepositoryTree />}
        />
        <Route
          exact
          path="/:login/repository/:name/settings"
          element={<Settings />}
        />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
