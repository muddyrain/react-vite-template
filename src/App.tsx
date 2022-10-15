import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import { Block } from "./components";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .get("/api/list", {
        params: {
          pageSize: 10,
          page: 1,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }, []);
  return (
    <div className="App">
      <Block>block test</Block>
    </div>
  );
}

export default App;
