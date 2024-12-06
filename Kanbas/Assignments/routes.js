import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Get all assignments
  app.get("/api/assignments", (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  });

  // Get single assignment by ID
  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = dao.findAssignmentById(aid);
    res.json(assignment);
  });

  // Get assignments for a course
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // Create assignment
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const assignment = dao.createAssignment({
      ...req.body,
      course: req.params.courseId,
    });
    res.json(assignment);
  });

  // Update assignment
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const status = dao.updateAssignment(aid, req.body);
    res.json(status);
  });

  // Delete assignment
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const status = dao.deleteAssignment(aid);
    res.json(status);
  });
}
