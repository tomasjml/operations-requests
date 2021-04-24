import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [operations, setOperations] = useState([]);

  const getOperations = async () => {
    let operationList = [];
    const url = "https://www.foaas.com/operations";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    };
    fetch(url, options)
      .then((response) => response.json())
      .then(setOperations)
      .catch((err) => console.log(err));
    return operationList;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOperations();
      setOperations(data);
    };
    fetchData();
  }, []);
  if (operations) {
    return (
      <div className="App">
        <h1>Operation names!</h1>
        {operations.map((operation) => {
          return <p>{operation.name}</p>;
        })}
      </div>
    );
  }
  return <h1>No operations</h1>;
}
