import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TaskPage";
import SettingsPage from "../pages/SettingsPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<DashboardLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;