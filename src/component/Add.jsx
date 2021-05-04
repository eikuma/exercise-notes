import { auth, db } from "../config/firebase";
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
      set: "",
    },
  ];
  const handleSubmit = (Name, num1, num2, setCount, e) => {
    e.preventDefault();

    db.collection("notes").add({
      userId: auth.currentUser.uid,
      date: day,
      name: Name,
      num1: num1,
      num2: num2,
      set: setCount,
      type: type,
      id: nanoid(),
    });
    set(false);
  };

  const Type = () => {
    if (type === "weight") {
      return (
        <Weight
          handleSubmit={handleSubmit}
          note={empty}
          close={set}
          closeId={false}
        />
      );
    } else if (type === "aerobic") {
      return (
        <Aerobic
          handleSubmit={handleSubmit}
          note={empty}
          close={set}
          closeId={false}
        />
      );
    } else {
      return (
        <Program
          handleSubmit={handleSubmit}
          note={empty}
          close={set}
          closeId={false}
        />
      );
    }
  };
  return <Type />;
};

export default Add;
