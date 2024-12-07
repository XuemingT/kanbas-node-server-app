import Database from "../Database/index.js";

export const findAllAssignments = () => {
  const { assignments } = Database;
  return assignments;
};

export const findAssignmentsForCourse = (courseId) => {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
};

export const findAssignmentById = (assignmentId) => {
  const { assignments } = Database;
  return assignments.find((assignment) => assignment._id === assignmentId);
};

export const createAssignment = (assignment) => {
  const newAssignment = { ...assignment, _id: new Date().getTime().toString() };
  Database.assignments.push(newAssignment);
  return newAssignment;
};

export const updateAssignment = (aid, assignmentUpdates) => {
  const assignmentIndex = Database.assignments.findIndex(
    (assignment) => assignment._id === aid
  );
  Database.assignments[assignmentIndex] = {
    ...Database.assignments[assignmentIndex],
    ...assignmentUpdates,
  };
  return Database.assignments[assignmentIndex];
};

export const deleteAssignment = (aid) => {
  Database.assignments = Database.assignments.filter(
    (assignment) => assignment._id !== aid
  );
  return { status: "OK" };
};
export function findCoursesForEnrolledUser(userId) {
  const { courses, enrollments } = Database;
  const enrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enrollment) =>
        enrollment.user === userId && enrollment.course === course._id
    )
  );
  return enrolledCourses;
}
