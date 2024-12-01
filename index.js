import express from "express";
import Hello from "./Hello.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import courses from "./Kanbas/Database/courses.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";

import users from "./Kanbas/Database/users.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
Hello(app);
CourseRoutes(app);
Lab5(app);
UserRoutes(app);
ModuleRoutes(app);
QuizRoutes(app);
app.listen(process.env.PORT || 4000);
