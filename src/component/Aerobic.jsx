import { auth, db } from "../config/firebase";
import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthService";
import { Button, TextField } from "@material-ui/core";

const Aerobic = ({ handleSubmit, note }) => {
  const [name, setName] = useState(note.name);
  const [num1, setNum1] = useState(note.num1);
  const [num2, setNum2] = useState(note.num2);

  return (
    <>
      <TextField
        onChange={(e) => {
          setName(e.target.value);
        }}
        variant="outlined"
        label="Name"
        defaultValue={note.name}
      />
      <TextField
        onChange={(e) => {
          setNum1(e.target.value);
        }}
        variant="outlined"
        label="Used Calories (kcal)"
        defaultValue={note.num1}
      />
      <TextField
        onChange={(e) => {
          setNum2(e.target.value);
        }}
        variant="outlined"
        label="Time (min)"
        defaultValue={note.num2}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={(e) => {
          handleSubmit(name, num1, num2, e);
        }}
      >
        登録
      </Button>
    </>
  );
};

export default Aerobic;
