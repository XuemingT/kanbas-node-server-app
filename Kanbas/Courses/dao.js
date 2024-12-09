import CourseModel from "./model.js";

export function deleteCourse(courseId) {
  return CourseModel.deleteOne({ _id: courseId });
}

export function findAllCourses() {
  return CourseModel.find();
}
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
export function createCourse(course) {
  delete course._id;
  return CourseModel.create(course);
}
export function updateCourse(courseId, courseUpdates) {
  return CourseModel.updateOne({ _id: courseId }, { $set: courseUpdates });
}
