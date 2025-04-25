import React from "react";
import FoodList from "./components/FoodList";

const App: React.FC = () => {
  return (
    <div>
      <h2 style={{ marginLeft: "670px", color: "white" }}>Online Food Management System</h2>
      <FoodList />
    </div>
  );
};

export default App;
