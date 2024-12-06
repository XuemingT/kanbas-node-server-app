import Database from "../Database/index.js";

export const findAllAssignments = () => {
  return Database.assignments;
};

export const findAssignmentsForCourse = (courseId) => {
  return Database.assignments.filter(
    (assignment) => assignment.course === courseId
  );
};

export const findAssignmentById = (assignmentId) => {
  return Database.assignments.find(
    (assignment) => assignment._id === assignmentId
  );
};

export const createAssignment = (assignment) => {
  const newAssignment = { ...assignment, _id: new Date().getTime().toString() };
  Database.assignments.push(newAssignment);
  return newAssignment;
};

export const updateAssignment = (aid, updates) => {
  const index = Database.assignments.findIndex(
    (assignment) => assignment._id === aid
  );
  if (index !== -1) {
    Database.assignments[index] = {
      ...Database.assignments[index],
      ...updates,
    };
    return Database.assignments[index];
  }
  return null;
};

export const deleteAssignment = (aid) => {
  const index = Database.assignments.findIndex(
    (assignment) => assignment._id === aid
  );
  if (index !== -1) {
    Database.assignments.splice(index, 1);
  }
  return { status: "OK" };
};
