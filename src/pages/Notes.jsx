import CircularProgress from "@material-ui/core/CircularProgress";
import {
  MenuItem,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { auth, db } from "../config/firebase";
import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthService";
import Header from "../component/Header";

const useStyles = makeStyles({
  container: {
    margin: "90px 15px 15px 15px",
  },
  date: {
    width: "120px",
  },
});

const Notes = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState(null);
  const user = useContext(AuthContext);
  // const [day, setDay] = useState(null);
  const [dayData, setDayData] = useState(null);

  let tmp = null;

  useEffect(() => {
    db.collection("notes")
      .where("userId", "==", auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        // データの取得
        const notes = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setNotes(notes);
      });
  }, []);

  if (!user) {
    return <Redirect to="/login" />;
  }

  const setData = (date) => {
    setDayData(notes.filter((note) => note.date === date));
    setDayData((pre) => {
      return pre;
    });
  };

  return (
    <>
      <div className={classes.container}>
        <Header />
        <TextField
          id="select"
          label="date"
          defaultValue="konn"
          onChange={(e) => {
            setData(e.target.value);
          }}
          select
          className={classes.date}
        >
          {notes ? (
            notes
              .sort((a, b) => {
                if (a.date < b.date) return -1;
                if (a.date > b.date) return 1;
                return 0;
              })
              .map((note) => {
                if (note.date != tmp) {
                  tmp = note.date;
                  return <MenuItem value={note.date}>{note.date}</MenuItem>;
                }
              })
          ) : (
            <CircularProgress />
          )}
        </TextField>
        <h3>Weight Training</h3>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Weight</TableCell>
                <TableCell align="right">Times</TableCell>
                <TableCell align="right">Set Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dayData ? (
                dayData.map((data) => {
                  if (data.type === "weight") {
                    return (
                      <TableRow key={data.id}>
                        <TableCell component="th" scope="row">
                          {data.name}
                        </TableCell>
                        <TableCell align="right">{data.num1}</TableCell>
                        <TableCell align="right">{data.num2}</TableCell>
                        <TableCell align="right">{data.set}</TableCell>
                      </TableRow>
                    );
                  }
                })
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <h3>Aerobic Training</h3>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Used Calories (kcal)</TableCell>
                <TableCell align="right">Time (min)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dayData ? (
                dayData.map((data) => {
                  if (data.type === "aerobic") {
                    return (
                      <TableRow key={data.id}>
                        <TableCell component="th" scope="row">
                          {data.name}
                        </TableCell>
                        <TableCell align="right">{data.num1}</TableCell>
                        <TableCell align="right">{data.num2}</TableCell>
                      </TableRow>
                    );
                  }
                })
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <h3>Program</h3>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Used Calories (kcal)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dayData ? (
                dayData.map((data) => {
                  if (data.type === "program") {
                    return (
                      <TableRow key={data.id}>
                        <TableCell component="th" scope="row">
                          {data.name}
                        </TableCell>
                        <TableCell align="right">{data.num1}</TableCell>
                      </TableRow>
                    );
                  }
                })
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Notes;
