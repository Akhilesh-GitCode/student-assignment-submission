# Student Assignment Submission System

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the app.

## Dependencies
- React
- React Router

## Features
- List assignments with basic details.
- View detailed assignment instructions and submit assignments.
- Submit assignments with student name, email, file upload, and comments.
- View submission confirmation or failure status.

## Design Decisions
- Used React hooks for state management.
- Simulated API calls for fetching and submitting assignments.
- Implemented responsive design with custom CSS.


1. Project Setup
First, create a React app as we did earlier, but this time we'll use plain CSS for styling.

bash
Copy
npx create-react-app student-assignment-submission
cd student-assignment-submission
2. Project Structure
Organize the project as follows:

bash
Copy
/src
  /components
    /AssignmentCard.js
    /AssignmentList.js
    /AssignmentDetail.js
    /SubmissionForm.js
    /LoadingSpinner.js
  /context
    /AssignmentContext.js
  /services
    /api.js
  /pages
    /Home.js
    /AssignmentPage.js
  /styles
    /App.css
  App.js
  index.js
3. Components Implementation
3.1 AssignmentCard.js
A card that displays brief assignment details in a grid.

jsx
Copy
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
3.2 AssignmentList.js
Fetch and display all assignments in a responsive layout.

jsx
Copy
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
3.3 AssignmentDetail.js
This component shows the detailed view of an assignment with a submission form.

jsx
Copy
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
3.4 SubmissionForm.js
A form where students can submit their assignments.

jsx
Copy
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
3.5 LoadingSpinner.js
A simple loading spinner component.

jsx
Copy
import React from "react";
import "../styles/LoadingSpinner.css";  // Importing custom CSS

const LoadingSpinner = () => {
  return <div className="loading-spinner">Loading...</div>;
};

export default LoadingSpinner;
4. API Simulation
4.1 api.js
Simulate the fetching of assignments and submission.

js
Copy
export const fetchAssignments = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Math Homework", description: "Solve equations", dueDate: "2025-03-10" },
        { id: 2, title: "Science Project", description: "Research a topic", dueDate: "2025-03-15" },
      ]);
    }, 1000);
  });
};

export const fetchAssignmentById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, title: "Math Homework", description: "Solve all equations", dueDate: "2025-03-10" });
    }, 1000);
  });
};
5. Routing (App.js)
Set up routing using React Router to navigate between the pages.

jsx
Copy
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
6. CSS Styling
Create your CSS files in /src/styles/ and apply styles for the components:

App.css
css
Copy
/* Global styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
  color: #333;
}

h1, h2 {
  color: #444;
}

a {
  text-decoration: none;
  color: #007BFF;
}

a:hover {
  color: #0056b3;
}
AssignmentCard.css
css
Copy
.assignment-card {
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.assignment-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.assignment-due-date,
.assignment-description {
  font-size: 1em;
  margin-bottom: 10px;
}

.view-details-link {
  color: #007BFF;
  font-weight: bold;
}

.view-details-link:hover {
  text-decoration: underline;
}
AssignmentList.css
css
Copy
.assignment-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
SubmissionForm.css
css
Copy
.submission-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.input-field {
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  padding: 12px 20px;
  background-color: #007BFF;
  color: white;
  font-size: 1.2em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}

.status-message {
  margin-top: 10px;
  font-size: 1.2em;
  color: green;
}
LoadingSpinner.css
css
Copy
.loading-spinner {
  font-size: 2em;
  text-align: center;
  margin-top: 20px;
}
7. Error Handling & Loading States
In all components where data is fetched (e.g., AssignmentList, AssignmentDetail), we handle loading and error states by showing a loading spinner or an error message.

8. README
Create a README.md with the following contents:

markdown
Copy
# Student Assignment Submission System

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the app.

## Dependencies
- React
- React Router

## Features
- List assignments with basic details.
- View detailed assignment instructions and submit assignments.
- Submit assignments with student name, email, file upload, and comments.
- View submission confirmation or failure status.

## Design Decisions
- Used React hooks for state management.
- Simulated API calls for fetching and submitting assignments.
- Implemented responsive design with custom CSS.
Conclusion
This updated approach uses plain CSS instead of Tailwind CSS, while still maintaining the structure and functionality you need for a student assignment submission system. The app allows for listing assignments, submitting assignments, providing feedback, and handling errors/loading states.

You said:
Did you forget AssignmentDetail.css code file ?
ChatGPT said:
Apologies for that! Here's the missing AssignmentDetail.css file that styles the AssignmentDetail component.

AssignmentDetail.css
css
Copy
.assignment-detail {
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 800px;
}

.assignment-title {
  font-size: 2em;
  margin-bottom: 20px;
}

.assignment-description {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.assignment-due-date {
  font-size: 1.1em;
  margin-bottom: 20px;
  color: #555;
}

.submission-form {
  margin-top: 30px;
}

.submission-form input,
.submission-form textarea {
  padding: 12px;
  font-size: 1em;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.submission-form textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  font-size: 1.1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.submit-button:hover {
  background-color: #0056b3;
}

.status-message {
  margin-top: 10px;
  font-size: 1.1em;
  color: green;
}
Explanation of the Styles:
assignment-detail: This container holds the entire detailed assignment view. It's styled with padding, border, shadow, and margin to make it visually distinct and centered on the page.
assignment-title: The title is large and spaced out at the top for prominence.
assignment-description and assignment-due-date: These sections have a more subtle font size for readability, with the due date being slightly faded.
submission-form: The form section is styled to be clean and organized with input fields and a text area for comments.
submit-button: The submit button is styled with a blue color that darkens slightly on hover to indicate interactivity.
status-message: Displays a success message when the form is submitted.
With this, the AssignmentDetail.css completes the styling for the detailed assignment page and submission form.

You said:
Above code has been Compiled with problems:
×
ERROR in ./src/App.js 5:0-74
Module not found: Error: Can't resolve 'react-router-dom' in 'C:\Users\maran\student-assignment-submission\src'
ERROR in ./src/components/AssignmentCard.js 5:0-40
Module not found: Error: Can't resolve 'react-router-dom' in 'C:\Users\maran\student-assignment-submission\src\components'
ERROR in ./src/components/AssignmentDetail.js 6:0-45
Module not found: Error: Can't resolve 'react-router-dom' in 'C:\Users\maran\student-assignment-submission\src\components'
ChatGPT said:
The error you are encountering is because the react-router-dom library is not installed in your project, and you're trying to use it in your components. To fix this, you need to install react-router-dom, which is the library used for routing in React applications.

Solution
Install react-router-dom
Run the following command in your terminal from your project directory:

bash
Copy
npm install react-router-dom
Re-run the project
After installing react-router-dom, you should be able to compile and run the project without the module not found error. You can now start your React app again with:

bash
Copy
npm start
This should resolve the issue, and your routing setup in App.js, AssignmentCard.js, and AssignmentDetail.js should work as expected.

Explanation
react-router-dom is a package that enables routing in React apps. It provides components like BrowserRouter, Route, Link, and useParams to navigate between different views.
In your project, you're using Link from react-router-dom to navigate between different pages (like from the list of assignments to the detailed assignment view). Without react-router-dom installed, these components won't be available, causing the error you're seeing.
Once the library is installed, the routing functionality will work and you should be able to view and navigate between the assignment list and assignment detail pages.