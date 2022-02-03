import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Files from "./pages/files";

function AppRoutes() {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="files" element={<Files />} />
    </Routes>
  );
}

export default AppRoutes;
