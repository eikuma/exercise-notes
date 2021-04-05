import { auth, db } from "../config/firebase";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthService";
import { Button, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";

import Weight from "../component/Weight";
import Aerobic from "../component/Aerobic";
import Program from "../component/Program";

const Add = ({ set, day, type }) => {
  const [empty, setEmpty] = [
    {
      name: "",
      num1: "",
      num2: "",
    },
  ];
  const handleSubmit = (Name, num1, num2, e) => {
    e.preventDefault();

    db.collection("notes").add({
      date: day,
      name: Name,
      num1: num1,
      num2: num2,
      type: type,
      id: nanoid(),
    });
    set(false);
  };

  const Type = () => {
    if (type === "weight") {
      return <Weight handleSubmit={handleSubmit} note={empty} />;
    } else if (type === "aerobic") {
      return <Aerobic handleSubmit={handleSubmit} note={empty} />;
    } else {
      return <Program handleSubmit={handleSubmit} note={empty} />;
    }
  };
  return (
    <>
      <Type />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          set(false);
        }}
      >
        とじる
      </Button>
    </>
  );
};

export default Add;
