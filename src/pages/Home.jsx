import { useContext } from "react";
import { Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthService";
import Header from "../component/Header";

const Home = () => {
  const user = useContext(AuthContext);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header />
      <h1>Home</h1>
      <Button variant="outlined" color="primary" component={Link} to="/record">
        Work Out
      </Button>
      <Button variant="outlined" color="secondary" component={Link} to="/notes">
        Result
      </Button>
    </>
  );
};

export default Home;
