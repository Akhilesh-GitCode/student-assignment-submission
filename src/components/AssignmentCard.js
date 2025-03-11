import React from "react";
import { Link } from "react-router-dom";
import "../styles/AssignmentCard.css";  // Importing custom CSS

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="assignment-card">
      <h2 className="assignment-title">{assignment.title}</h2>
      <p className="assignment-due-date">Due Date: {assignment.dueDate}</p>
      <p className="assignment-description">{assignment.description}</p>
      <Link to={`/assignments/${assignment.id}`} className="view-details-link">
        View Details
      </Link>
    </div>
  );
};

export default AssignmentCard;
