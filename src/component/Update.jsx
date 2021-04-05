import { auth, db } from "../config/firebase";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthService";
import { Button, TextField } from "@material-ui/core";
import { nanoid } from "nanoid";

import Weight from "./Weight";
import Aerobic from "./Aerobic";
import Program from "./Program";

const Update = ({ changeEditing, note, day, type }) => {
  const handleSubmit = (Name, num1, num2, e) => {
    e.preventDefault();

    db.collection("notes")
      .where("id", "==", note.id)
      .get()
      .then((doc) => {
        db.collection("notes").doc(doc.docs[0].id).update({
          // userId: auth.currentUser.uid,
          date: day,
          name: Name,
          num1: num1,
          num2: num2,
          type: type,
          id: note.id,
        });
      });
  };

  const Type = () => {
    if (type === "weight") {
      return <Weight handleSubmit={handleSubmit} note={note} />;
    } else if (type === "aerobic") {
      return <Aerobic handleSubmit={handleSubmit} note={note} />;
    } else {
      return <Program handleSubmit={handleSubmit} note={note} />;
    }
  };
  return (
    <>
      <form>
        <Type />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            changeEditing(note.id);
          }}
        >
          とじる
        </Button>
      </form>
    </>
  );
};

export default Update;
