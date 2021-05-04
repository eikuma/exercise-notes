import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthService";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Header from "../component/Header";

const useStyles = makeStyles({
  container: {
    marginTop: "64px",
  },
  title: {
    color: "blue",
    margin: "0 auto",
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

const Login = ({ history }) => {
  const classes = useStyles();
  const [pass, set] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        if (
          error.message ===
          "There is no user record corresponding to this identifier. The user may have been deleted."
        ) {
          alert("メールアドレス、またはパスワードが一致しません");
        }
      });
  };

  const user = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={classes.container}>
        <Header />
        <form className={classes.form}>
          <h1 className={classes.title}>Login</h1>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            variant="outlined"
            label="E-mail"
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={pass}
            variant="outlined"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => set(pass === "password" ? "text" : "password")}
                >
                  <VisibilityIcon color="disabled" />
                </InputAdornment>
              ),
            }}
          />

          <Link to="/signup">Click here if you don't have an account.</Link>
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
