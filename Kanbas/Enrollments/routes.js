import * as dao from "./dao.js";

function EnrollmentRoutes(app) {
  // Get all enrollments
  app.get("/api/enrollments", (req, res) => {
    const enrollments = dao.findAllEnrollments();
    res.json(enrollments);
  });

  // Get enrollments by user
  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsByUser(userId);
    res.json(enrollments);
  });

  // Get enrollments by course
  app.get("/api/courses/:courseId/enrollments", (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsByCourse(courseId);
    res.json(enrollments);
  });

  // Create enrollment
  app.post("/api/enrollments", (req, res) => {
    const enrollment = dao.createEnrollment(req.body);
    res.json(enrollment);
  });

  // Delete enrollment
  app.delete("/api/users/:userId/courses/:courseId/enrollments", (req, res) => {
    const { userId, courseId } = req.params;
    const status = dao.deleteEnrollment(userId, courseId);
    res.json(status);
  });
}

export default EnrollmentRoutes;
