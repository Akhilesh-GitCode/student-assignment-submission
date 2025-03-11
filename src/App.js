import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AssignmentList from "./components/AssignmentList";
import AssignmentDetail from "./components/AssignmentDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AssignmentList />} />
        <Route path="/assignments/:id" element={<AssignmentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
