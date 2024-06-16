import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [elementNames, setElementNames] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9010/api/v1.0.0/pte");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();

        // Assuming your API response is an array of objects with 'name' property
        const names = jsonData.data.map((element: any) => element.elementName);
        setElementNames(names);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>All Element Names</h1>
      <ul>
        {elementNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
