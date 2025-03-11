import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SubmissionForm from "./SubmissionForm";
import { fetchAssignmentById } from "../services/api";
import "../styles/AssignmentDetail.css";  // Importing custom CSS

const AssignmentDetail = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignmentById(id)
      .then((data) => {
        setAssignment(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load assignment details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="assignment-detail">
      <h1 className="assignment-title">{assignment.title}</h1>
      <p className="assignment-description">{assignment.description}</p>
      <p className="assignment-due-date">Due Date: {assignment.dueDate}</p>
      <SubmissionForm assignmentId={assignment.id} />
    </div>
  );
};

export default AssignmentDetail;
