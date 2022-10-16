import { useEffect, useState } from "react";
import "./App.less";
import axios from "axios";
import { Block, Dialog, Drawer } from "./components";
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
      <h5>test Block Components</h5>
      <Block>block test</Block>
      <h5>test Dialog Components</h5>
      <Dialog width={600}>哈哈哈</Dialog>
      <h5>test Drawer Components</h5>
      <Drawer width={600}>哈哈哈</Drawer>
    </div>
  );
}

export default App;
