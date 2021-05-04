import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthService";
import Header from "../component/Header";
import Img from "../image/fitness.jpg";

const useStyles = makeStyles({
  container: {
    backgroundImage: `url(${Img})`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "lighten",
    backgroundColor: "rgba(200,200,200,0.8)",
    minHeight: "100vh",
  },
  title: {
    margin: "0 auto",
    marginTop: "100px",
    width: "350px",
    height: "380px",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  H1: {
    fontSize: "45px",
    textAlign: "center",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100px",
  },
  P: {
    fontSize: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    height: "480px",
    width: "350px",
    margin: "0 auto",
  },
});

const Home = () => {
  const user = useContext(AuthContext);
  const classes = useStyles();

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className={classes.container}>
        <Header />
        <div className={classes.title}>
          <h1 className={classes.H1}>Exercise Notes</h1>
          <p className={classes.P}>
            It is an application that can record and check daily exercise.
          </p>
          <div className={classes.button}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/record"
            >
              Work Out
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              component={Link}
              to="/notes"
            >
              Result
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
