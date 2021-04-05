import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../config/firebase";
import { useForm } from "react-hook-form";
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
    <form className={classes.form} onSubmit={handleSubmit(signup)}>
      <h1 className={classes.title}>SignUp</h1>
      <TextField
        name="username"
        variant="outlined"
        label="ユーザーネーム"
        inputRef={register({
          required: true,
        })}
      />
      {errors.username && "ユーザーネームを入力してください"}
      <TextField
        name="email"
        variant="outlined"
        label="メールアドレス"
        inputRef={register({
          required: "メールアドレスを入力してください",
          pattern: {
            value: mailReg,
            message: "正しいメールアドレスを入力してください",
          },
        })}
      />
      {errors.email && errors.email.message}
      <TextField
        name="password"
        type={pass}
        variant="outlined"
        label="パスワード"
        inputRef={register({
          required: "パスワードを入力してください",
          pattern: {
            value: passReg,
            message:
              "半角英字と半角数字それぞれ1文字以上含む8文字以上のパスワードを入力してください",
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
      <Link to="/login">すでにアカウントをお持ちの方はこちら</Link>
      <Button type="submit" variant="outlined" color="primary">
        登録
      </Button>
    </form>
  );
};

export default SignUp;
