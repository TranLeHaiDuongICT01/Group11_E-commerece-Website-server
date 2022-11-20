import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CheckGroup({
  list,
  name,
  data,
  setData,
  clear,
  setClear,
}) {
  const arr = list?.map((item) => {
    if (name === "category") {
      if (data.categories.indexOf(item) !== -1) return true;
    } else if (name === "size") {
      if (data.size.indexOf(item) !== -1) return true;
    } else if (name === "color") {
      if (data.color.indexOf(item) !== -1) return true;
    }
    return false;
  });
  const [checkedList, setCheckedList] = React.useState([...arr]);
  const handleCheck = (e, i) => {
    const arr = [...checkedList];
    arr[i] = !arr[i];
    setCheckedList(arr);
    if (name === "category") {
      const index = data.categories.indexOf(e.target.name);
      if (index === -1) data.categories.push(e.target.name);
      else data.categories.splice(index, 1);
    } else if (name === "size") {
      const index = data.size.indexOf(e.target.name);
      if (index === -1) data.size.push(e.target.name);
      else data.size.splice(index, 1);
    } else if (name === "color") {
      const index = data.color.indexOf(e.target.name);
      if (index === -1) data.color.push(e.target.name);
      else data.color.splice(index, 1);
    }
  };
  React.useEffect(() => {
    if (clear) {
      setCheckedList([...new Array(list.length).fill(false)]);
    }
    setClear(false);
  }, [clear]);
  return (
    <FormGroup
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {list &&
        list?.map((item, i) => (
          <FormControlLabel
            key={item}
            control={<Checkbox checked={checkedList[i]} />}
            label={item}
            name={item}
            onChange={(e) => handleCheck(e, i)}
          />
        ))}
    </FormGroup>
  );
}
