import { TextField } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { auth, db } from "../config/firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Add from "../component/Add";
import Update from "../component/Update";
import Header from "../component/Header";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  container: {
    margin: "90px 15px 15px 15px",
  },
  Wrapper: {
    width: "100%",
    margin: "0 20px",
    display: "flex",
    justifyContent: "space-between",
  },
  add: {
    margin: "65px auto 0px auto",
  },
  Card: {
    minHeight: "195px",
  },
});

const Record = () => {
  const classes = useStyles();
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  const [judgeWeight, setJudgeWeight] = useState(false);
  const [judgeAerobic, setJudgeAerobic] = useState(false);
  const [judgeProgram, setJudgeProgram] = useState(false);
  const [day, setDay] = useState(date);

  const [notes, setNotes] = useState(null);

  useEffect(() => {
    db.collection("notes")
      .where("userId", "==", auth.currentUser.uid)
      .where("date", "==", day)
      .onSnapshot((snapshot) => {
        // データの取得
        const notes = snapshot.docs.map((doc) => {
          return doc.data();
        });
        //   setNotes(notes);
        setNotes(
          notes.map((note) => {
            return {
              ...note,
              editing: false,
            };
          })
        );
      });
  }, [day]);

  const user = useContext(AuthContext);

  if (!user) {
    return <Redirect to="/login" />;
  }

  const deleteDoc = (id) => {
    db.collection("notes")
      .where("id", "==", id)
      .get()
      .then((doc) => {
        db.collection("notes").doc(doc.docs[0].id).delete();
      });
  };

  const changeEditing = (id) => {
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            editing: !note.editing,
          };
        } else {
          return {
            ...note,
          };
        }
      })
    );
  };

  return (
    <>
      <div className={classes.container}>
        <Header />
        <TextField
          id="date"
          label="date"
          type="date"
          defaultValue={date}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setDay(e.target.value);
          }}
        />
        <h3>Weight Training</h3>
        <Grid container spacing={1}>
          <Grid item sm={4} xs={12}>
            <Card variant="outlined" className={classes.Card}>
              {judgeWeight ? (
                <Add set={setJudgeWeight} day={day} type="weight" />
              ) : (
                <CardActions>
                  <IconButton
                    aria-label="Add record"
                    className={classes.add}
                    onClick={() => {
                      setJudgeWeight(true);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          </Grid>
          {notes ? (
            notes.map((note) => {
              if (note.type === "weight") {
                if (note.editing) {
                  return (
                    <Update
                      changeEditing={changeEditing}
                      note={note}
                      day={day}
                      type="weight"
                      key={note.id}
                    />
                  );
                } else {
                  return (
                    <Grid item sm={4} xs={12}>
                      <Card variant="outlined" className={classes.Card}>
                        <CardContent>
                          <Typography color="textSecondary">
                            {`Name: ${note.name}`}
                          </Typography>
                          <Typography color="textSecondary">
                            {`Weight: ${note.num1}`}
                          </Typography>
                          <Typography color="textSecondary">
                            {`Times: ${note.num2}`}
                          </Typography>
                          <Typography color="textSecondary">
                            {`Set Count: ${note.set}`}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton
                            aria-label="Edit"
                            onClick={() => {
                              changeEditing(note.id);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => {
                              deleteDoc(note.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              }
            })
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <h3>Aerobic Training</h3>
        <Grid container spacing={1}>
          <Grid item sm={4} xs={12}>
            <Card variant="outlined" className={classes.Card}>
              {judgeAerobic ? (
                <Add set={setJudgeAerobic} day={day} type="aerobic" />
              ) : (
                <CardActions>
                  <IconButton
                    aria-label="Add record"
                    className={classes.add}
                    onClick={() => {
                      setJudgeAerobic(true);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          </Grid>
          {notes ? (
            notes.map((note) => {
              if (note.type === "aerobic") {
                if (note.editing) {
                  return (
                    <Update
                      changeEditing={changeEditing}
                      note={note}
                      day={day}
                      type="aerobic"
                      key={note.id}
                    />
                  );
                } else {
                  return (
                    <Grid item sm={4} xs={12}>
                      <Card variant="outlined" className={classes.Card}>
                        <CardContent>
                          <Typography color="textSecondary">
                            {`Name: ${note.name}`}
                          </Typography>
                          <Typography color="textSecondary">
                            {`Used Calories (kcal): ${note.num1}`}
                          </Typography>
                          <Typography color="textSecondary">
                            {`Time: ${note.num2}`}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton
                            aria-label="Edit"
                            onClick={() => {
                              changeEditing(note.id);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => {
                              deleteDoc(note.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              }
            })
          ) : (
            <CircularProgress />
          )}
        </Grid>
        <h3>Program</h3>
        <Grid container spacing={1}>
          <Grid item sm={4} xs={12}>
            <Card variant="outlined" className={classes.Card}>
              {judgeProgram ? (
                <Add set={setJudgeProgram} day={day} type="program" />
              ) : (
                <CardActions>
                  <IconButton
                    aria-label="Add record"
                    className={classes.add}
                    onClick={() => {
                      setJudgeProgram(true);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </CardActions>
              )}
            </Card>
          </Grid>
          {notes ? (
            notes.map((note) => {
              if (note.type === "program") {
                if (note.editing) {
                  return (
                    <Update
                      changeEditing={changeEditing}
                      note={note}
                      day={day}
                      type="program"
                      key={note.id}
                    />
                  );
                } else {
                  return (
                    <Grid item sm={4} xs={12}>
                      <Card variant="outlined" className={classes.Card}>
                        <CardContent>
                          <Typography color="textSecondary">
                            {`Name: ${note.name}`}
                          </Typography>
                          <Typography color="textSecondary">
                            {`Used Calories (kcal): ${note.num1}`}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <IconButton
                            aria-label="Edit"
                            onClick={() => {
                              changeEditing(note.id);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            onClick={() => {
                              deleteDoc(note.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                }
              }
            })
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </div>
    </>
  );
};

export default Record;
