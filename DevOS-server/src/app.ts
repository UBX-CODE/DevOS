import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import githubRoutes from "./routes/github.routes";
import leetcodeRoutes from "./routes/leetcode.routes";
import session from "express-session";
import passport from "./config/passport";
import workflowRoutes from "./routes/workflow.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/github",githubRoutes);
app.use("/api/leetcode",leetcodeRoutes);
app.use(session({ secret: "devos-secret", resave: false, saveUninitialized: false,}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/workflows", workflowRoutes);


app.get("/", (_, res) => {
    res.send("DevOS API Running");
});

export default app;