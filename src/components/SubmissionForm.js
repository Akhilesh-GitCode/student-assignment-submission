import React, { useState } from "react";
import "../styles/SubmissionForm.css";  // Importing custom CSS

const SubmissionForm = ({ assignmentId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", file);
    formData.append("comment", comment);

    // Simulate an API submission
    fetch(`/api/submit/${assignmentId}`, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setStatus("Submitted");
      })
      .catch(() => {
        setStatus("Failed to submit");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="submission-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="input-field"
      />
      <textarea
        placeholder="Comments"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="input-field"
      />
      <button type="submit" className="submit-button">
        Submit Assignment
      </button>
      {status && <p className="status-message">{status}</p>}
    </form>
  );
};

export default SubmissionForm;
