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
  