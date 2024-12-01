import * as quizDao from "./dao.js";

export default function QuizRoutes(app) {
  // Find all quizzes for a course
  app.get("/api/courses/:cid/quizzes", (req, res) => {
    try {
      const { cid } = req.params;
      const quizzes = quizDao.findQuizzesForCourse(cid);
      if (!quizzes || quizzes.length === 0) {
        return res.json([]);
      }
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      res.status(500).json({ error: "Error fetching quizzes" });
    }
  });

  // Find quiz by ID
  app.get("/api/quizzes/:qid", (req, res) => {
    try {
      const { qid } = req.params;
      const quiz = quizDao.findQuizById(qid);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Error fetching quiz" });
    }
  });

  // Create new quiz
  app.post("/api/courses/:cid/quizzes", (req, res) => {
    try {
      const { cid } = req.params;
      const newQuiz = quizDao.createQuiz({
        ...req.body,
        course: cid,
      });
      if (!newQuiz) {
        return res.status(400).json({ error: "Failed to create quiz" });
      }
      res.json(newQuiz);
    } catch (error) {
      console.error("Error in create quiz route:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update quiz
  app.put("/api/quizzes/:qid", (req, res) => {
    try {
      const { qid } = req.params;
      const status = quizDao.updateQuiz(qid, req.body);
      if (!status) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Error updating quiz" });
    }
  });

  // Delete quiz
  app.delete("/api/quizzes/:qid", (req, res) => {
    try {
      const { qid } = req.params;
      const status = quizDao.deleteQuiz(qid);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Error deleting quiz" });
    }
  });

  // Add question to quiz
  app.post("/api/quizzes/:qid/questions", (req, res) => {
    try {
      const { qid } = req.params;
      const newQuestion = quizDao.addQuestionToQuiz(qid, req.body);
      if (!newQuestion) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(newQuestion);
    } catch (error) {
      res.status(500).json({ error: "Error adding question" });
    }
  });

  // Update question in quiz
  app.put("/api/quizzes/:qid/questions/:questionId", (req, res) => {
    try {
      const { qid, questionId } = req.params;
      const status = quizDao.updateQuizQuestion(qid, questionId, req.body);
      if (!status) {
        return res.status(404).json({ error: "Quiz or question not found" });
      }
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Error updating question" });
    }
  });

  // Delete question from quiz
  app.delete("/api/quizzes/:qid/questions/:questionId", (req, res) => {
    try {
      const { qid, questionId } = req.params;
      const status = quizDao.deleteQuizQuestion(qid, questionId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Error deleting question" });
    }
  });

  // Update quiz status
  app.put("/api/quizzes/:qid/status", (req, res) => {
    try {
      const { qid } = req.params;
      const { status } = req.body;
      const updatedQuiz = quizDao.updateQuizStatus(qid, status);
      if (!updatedQuiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(updatedQuiz);
    } catch (error) {
      res.status(500).json({ error: "Error updating quiz status" });
    }
  });
}
