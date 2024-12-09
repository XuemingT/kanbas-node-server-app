import Database from "../Database/index.js";

// Find quiz by ID and course
export const findQuizById = (qid) => {
  const quiz = Database.quizzes.find((quiz) => quiz._id === qid);
  return quiz;
};

// Find all quizzes for a specific course
export const findQuizzesForCourse = (courseId) => {
  const quizzes = Database.quizzes.filter((quiz) => quiz.course === courseId);
  return quizzes;
};

// Create a new quiz
export const createQuiz = (quiz) => {
  try {
    const newQuiz = {
      ...quiz,
      _id: new Date().getTime().toString(),
      status: "draft",
      points: 0,
    };
    Database.quizzes.push(newQuiz);
    return newQuiz;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
};

// Update an existing quiz
export const updateQuiz = (qid, quizUpdates) => {
  const index = Database.quizzes.findIndex((quiz) => quiz._id === qid);
  if (index !== -1) {
    Database.quizzes[index] = {
      ...Database.quizzes[index],
      ...quizUpdates,
    };
    return Database.quizzes[index];
  }
  return null;
};

// Delete a quiz
export const deleteQuiz = (qid) => {
  const index = Database.quizzes.findIndex((quiz) => quiz._id === qid);
  if (index !== -1) {
    Database.quizzes.splice(index, 1);
    return { status: "ok", deletedQuizId: qid };
  }
  return { status: "error", message: "Quiz not found" };
};

// Add a question to a quiz
export const addQuestionToQuiz = (qid, question) => {
  const quiz = findQuizById(qid);
  if (quiz) {
    const newQuestion = {
      ...question,
      _id: new Date().getTime().toString(),
      points: question.points || 0,
    };
    quiz.questions.push(newQuestion);
    return newQuestion;
  }
  return null;
};

// Update a question in a quiz
export const updateQuizQuestion = (qid, questionId, questionUpdates) => {
  const quiz = findQuizById(qid);
  if (quiz) {
    const questionIndex = quiz.questions.findIndex((q) => q._id === questionId);
    if (questionIndex !== -1) {
      quiz.questions[questionIndex] = {
        ...quiz.questions[questionIndex],
        ...questionUpdates,
      };
      return quiz.questions[questionIndex];
    }
  }
  return null;
};

// Delete a question from a quiz
export const deleteQuizQuestion = (qid, questionId) => {
  const quiz = findQuizById(qid);
  if (quiz) {
    quiz.questions = quiz.questions.filter((q) => q._id !== questionId);
    return { status: "ok" };
  }
  return { status: "error", message: "Quiz not found" };
};

// Update quiz status (publish/unpublish)
export const updateQuizStatus = (qid, status) => {
  const quiz = findQuizById(qid);
  if (quiz) {
    quiz.status = status;
    return quiz;
  }
  return null;
};

// Add these quizattempt
export const createQuizAttempt = (attemptData) => {
  const newAttempt = {
    ...attemptData,
    _id: new Date().getTime().toString(),
    startTime: new Date().toISOString(),
  };
  Database.quizAttempts.push(newAttempt);
  return newAttempt;
};

export const findQuizAttemptsByUser = (quizId, userId) => {
  return Database.quizAttempts.filter(
    (attempt) => attempt.quizId === quizId && attempt.userId === userId
  );
};

export const updateQuizAttempt = (attemptId, updates) => {
  const index = Database.quizAttempts.findIndex(
    (attempt) => attempt._id === attemptId
  );
  if (index !== -1) {
    Database.quizAttempts[index] = {
      ...Database.quizAttempts[index],
      ...updates,
    };
    return Database.quizAttempts[index];
  }
  return null;
};

export const getLatestAttempt = (quizId, userId) => {
  const attempts = findQuizAttemptsByUser(quizId, userId);
  return attempts.length > 0
    ? attempts.sort(
        (a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
      )[0]
    : null;
};
