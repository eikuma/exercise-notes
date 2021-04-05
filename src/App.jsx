import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthService";
import LoggedInRoute from "./component/LoggedInRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Notes from "./pages/Notes";
import Home from "./pages/Home";
import Record from "./pages/Record";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <LoggedInRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/notes" component={Notes} />
          <Route exact path="/record" component={Record} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
