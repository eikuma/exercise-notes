import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthService";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles({
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
    <form className={classes.form}>
      <h1 className={classes.title}>Login</h1>
      <TextField
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        variant="outlined"
        label="メールアドレス"
      />
      <TextField
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type={pass}
        variant="outlined"
        label="パスワード"
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

      <Link to="/signup">アカウントをお持ちでない方</Link>
      <Button variant="outlined" color="primary" onClick={handleSubmit}>
        登録
      </Button>
    </form>
  );
};

export default Login;
