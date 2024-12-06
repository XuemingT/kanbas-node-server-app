import Database from "../Database/index.js";

export const findAllEnrollments = () => {
  return Database.enrollments;
};

export const findEnrollmentsByUser = (userId) => {
  return Database.enrollments.filter(
    (enrollment) => enrollment.user === userId
  );
};

export const findEnrollmentsByCourse = (courseId) => {
  return Database.enrollments.filter(
    (enrollment) => enrollment.course === courseId
  );
};

export const findEnrollment = (userId, courseId) => {
  return Database.enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
};

export const createEnrollment = (enrollment) => {
  const newEnrollment = {
    ...enrollment,
    _id: new Date().getTime().toString(),
  };
  Database.enrollments.push(newEnrollment);
  return newEnrollment;
};

export const deleteEnrollment = (userId, courseId) => {
  const index = Database.enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (index !== -1) {
    Database.enrollments.splice(index, 1);
  }
  return { status: "OK" };
};
