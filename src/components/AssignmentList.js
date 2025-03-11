import React, { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";
import LoadingSpinner from "./LoadingSpinner";
import { fetchAssignments } from "../services/api";
import "../styles/AssignmentList.css";  // Importing custom CSS

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments()
      .then((data) => {
        setAssignments(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load assignments");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="assignment-list">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
};

export default AssignmentList;
