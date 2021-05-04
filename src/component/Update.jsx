import { db } from "../config/firebase";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import Weight from "./Weight";
import Aerobic from "./Aerobic";
import Program from "./Program";

const useStyles = makeStyles({
  Card: {
    minHeight: "195px",
  },
});

const Update = ({ changeEditing, note, day, type }) => {
  const classes = useStyles();
  const handleSubmit = (Name, num1, num2, setCount, e) => {
    e.preventDefault();

    db.collection("notes")
      .where("id", "==", note.id)
      .get()
      .then((doc) => {
        db.collection("notes").doc(doc.docs[0].id).update({
          userId: note.userId,
          date: day,
          name: Name,
          num1: num1,
          num2: num2,
          set: setCount,
          type: type,
          id: note.id,
        });
      });
  };

  const Type = () => {
    if (type === "weight") {
      return (
        <Weight
          handleSubmit={handleSubmit}
          note={note}
          close={changeEditing}
          closeId={note.id}
        />
      );
    } else if (type === "aerobic") {
      return (
        <Aerobic
          handleSubmit={handleSubmit}
          note={note}
          close={changeEditing}
          closeId={note.id}
        />
      );
    } else {
      return (
        <Program
          handleSubmit={handleSubmit}
          note={note}
          close={changeEditing}
          closeId={note.id}
        />
      );
    }
  };
  return (
    <>
      <Grid item sm={4} xs={12}>
        <Card variant="outlined" className={classes.Card}>
          <Type />
        </Card>
      </Grid>
    </>
  );
};

export default Update;
