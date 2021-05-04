import { useState } from "react";
import { TextField, CardActions, IconButton } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  text: {
    width: "100%",
  },
});

const Program = ({ handleSubmit, note, close, closeId }) => {
  const [name, setName] = useState(note.name);
  const [num1, setNum1] = useState(note.num1);
  const [num2, setNum2] = useState(note.num2);
  const [set, setSet] = useState(note.set);
  const classes = useStyles();

  return (
    <>
      <CardActions>
        <TextField
          onChange={(e) => {
            setName(e.target.value);
          }}
          variant="outlined"
          label="Name"
          defaultValue={note.name}
          className={classes.text}
        />
      </CardActions>
      <CardActions>
        <TextField
          onChange={(e) => {
            setNum1(e.target.value);
          }}
          variant="outlined"
          label="Used Calories (kcal)"
          defaultValue={note.num1}
          className={classes.text}
        />
      </CardActions>
      <CardActions>
        <IconButton
          aria-label="Upload"
          onClick={(e) => handleSubmit(name, num1, num2, set, e)}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          aria-label="Close"
          onClick={() => {
            close(closeId);
          }}
        >
          <HighlightOffIcon />
        </IconButton>
      </CardActions>
    </>
  );
};

export default Program;
