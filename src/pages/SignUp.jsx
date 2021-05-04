import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../config/firebase";
import { useForm } from "react-hook-form";
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

const SignUp = () => {
  const classes = useStyles();
  const [pass, set] = useState("password");
  const { register, handleSubmit, errors, reset } = useForm();
  const passReg = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
  );
  const mailReg = new RegExp(
    "^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$"
  );

  const signup = (data) => {
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        result.user.updateProfile({ displayName: data.username });
      })
      .catch((error) => {
        console.log(error);
      });
    reset();
  };

  const user = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={classes.container}>
        <Header />
        <form className={classes.form} onSubmit={handleSubmit(signup)}>
          <h1 className={classes.title}>SignUp</h1>
          <TextField
            name="username"
            variant="outlined"
            label="User Name"
            inputRef={register({
              required: true,
            })}
          />
          {errors.username && "Please enter your username."}
          <TextField
            name="email"
            variant="outlined"
            label="E-mail"
            inputRef={register({
              required: "Please enter your E-mail address.",
              pattern: {
                value: mailReg,
                message: "Please enter the correct email address.",
              },
            })}
          />
          {errors.email && errors.email.message}
          <TextField
            name="password"
            type={pass}
            variant="outlined"
            label="Password"
            inputRef={register({
              required: "Please enter your password.",
              pattern: {
                value: passReg,
                message:
                  "Please enter a password of 8 characters or more including 1 or more half-width alphabets and 1 or more half-width numbers.",
              },
            })}
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
          {errors.password && errors.password.message}
          <Link to="/login">Click here if you already have an account.</Link>
          <Button type="submit" variant="outlined" color="primary">
            Sign Up
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
