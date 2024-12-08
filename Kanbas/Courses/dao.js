import Database from "../Database/index.js";

export const findAllCourses = () => {
  const { courses } = Database;
  return courses;
};
export const createCourse = (course) => {
  const newCourse = {
    ...course,
    _id: new Date().getTime().toString(),
    startDate: course.startDate || "2023-01-10",
    endDate: course.endDate || "2023-05-15",
    credits: course.credits || 3,
  };
  Database.courses.push(newCourse);
  return newCourse;
};
export const deleteCourse = (courseId) => {
  const courseCount = Database.courses.length;
  Database.courses = Database.courses.filter(
    (course) => course._id !== courseId
  );
  return { status: courseCount > Database.courses.length ? "OK" : "NOT FOUND" };
};
export const updateCourse = (courseId, courseUpdates) => {
  const courseIndex = Database.courses.findIndex(
    (course) => course._id === courseId
  );
  if (courseIndex === -1) return null;
  Database.courses[courseIndex] = {
    ...Database.courses[courseIndex],
    ...courseUpdates,
  };
  return Database.courses[courseIndex];
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
