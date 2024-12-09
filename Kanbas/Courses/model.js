import mongoose from "mongoose";
import courseSchema from "./schema";
const courseModel = mongoose.model("Course", courseSchema);
