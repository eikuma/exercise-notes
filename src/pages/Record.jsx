import { Button, TextField } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { auth, db } from "../config/firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthService";
import CircularProgress from "@material-ui/core/CircularProgress";
import Add from "../component/Add";
import Update from "../component/Update";
import Header from "../component/Header";

const useStyles = makeStyles({
  container: {
    marginTop: "64px",
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
  });

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
        <h3>ウエイトトレーニング</h3>
        <ul>
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
                    />
                  );
                } else {
                  return (
                    <li>
                      <span>{`${note.name},${note.num1},${note.num2}`}</span>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          changeEditing(note.id);
                        }}
                      >
                        編集
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          deleteDoc(note.id);
                        }}
                      >
                        削除
                      </Button>
                    </li>
                  );
                }
              }
            })
          ) : (
            <CircularProgress />
          )}
        </ul>
        <div>
          {judgeWeight ? (
            <Add set={setJudgeWeight} day={day} type="weight" />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setJudgeWeight(true);
              }}
            >
              + 新規追加
            </Button>
          )}
        </div>
        <h3>有酸素レーニング</h3>
        <ul>
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
                    />
                  );
                } else {
                  return (
                    <li>
                      <span>{`${note.name},${note.num1},${note.num2}`}</span>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          changeEditing(note.id);
                        }}
                      >
                        編集
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          deleteDoc(note.id);
                        }}
                      >
                        削除
                      </Button>
                    </li>
                  );
                }
              }
            })
          ) : (
            <CircularProgress />
          )}
        </ul>
        <div>
          {judgeAerobic ? (
            <Add set={setJudgeAerobic} day={day} type="aerobic" />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setJudgeAerobic(true);
              }}
            >
              + 新規追加
            </Button>
          )}
        </div>
        <h3>プログラム</h3>
        <ul>
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
                    />
                  );
                } else {
                  return (
                    <li>
                      <span>{`${note.name},${note.num1},${note.num2}`}</span>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          changeEditing(note.id);
                        }}
                      >
                        編集
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          deleteDoc(note.id);
                        }}
                      >
                        削除
                      </Button>
                    </li>
                  );
                }
              }
            })
          ) : (
            <CircularProgress />
          )}
        </ul>
        <div>
          {judgeProgram ? (
            <Add set={setJudgeProgram} day={day} type="program" />
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setJudgeProgram(true);
              }}
            >
              + 新規追加
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Record;
