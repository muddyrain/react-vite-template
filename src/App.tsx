import { useEffect, useState } from "react";
import "./App.less";
import axios from "axios";
import { Block, Dialog, Drawer, Tabler } from "./components";
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
      <h5>test Drawer Components</h5>
      <Tabler
        columns={[
          {
            title: "哈哈",
            dataIndex: "firstName",
          },
        ]}
        dataSource={[
          {
            key: "1",
            firstName: "John",
            lastName: "Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
          },
          {
            key: "2",
            firstName: "John",
            lastName: "Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
          },
        ]}
        actions={[
          {
            confirm: "哈哈",
            props: {
              danger: true,
            },
            content: (e, i) => {
              console.log("content", e, i);
              return "1";
            },
            onClick: (e, i) => {
              console.log(e, i);
            },
          },
        ]}
      />
    </div>
  );
}

export default App;
