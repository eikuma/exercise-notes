import CircularProgress from "@material-ui/core/CircularProgress";
import Cal from "../component/Cal";
import { auth, db } from "../config/firebase";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthService";
import Header from "../component/Header";

const Notes = () => {
  const [notes, setNotes] = useState(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    db.collection("notes").onSnapshot((snapshot) => {
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

  return (
    <>
      <Header />
      <h1>Notes</h1>
      <Cal />
    </>
  );
};

export default Notes;
