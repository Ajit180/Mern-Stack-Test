import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./src/pages/layout/Layout";
import Background from "./src/pages/auth/Background";
import Signin from "./src/pages/auth/Signin";
import Signup from "./src/pages/auth/Singnup";
import TestPage from "./src/pages/testpage/Testpage";
import ResultPage from "./src/pages/result/ResultPage";
import TestEditPage from "./src/pages/edit/EditTestpage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout wraps all pages with Navbar */}
      <Route path="/" element={<Layout />}>
        {/* Default route redirects to signup */}
        <Route index element={<Navigate to="/signup" replace />} />

        {/* Signup Route */}
        <Route
          path="signup"
          element={
            <Background>
              <Signup />
            </Background>
          }
        />

        {/* Signin Route */}
        <Route
          path="signin"
          element={
            <Background>
              <Signin />
            </Background>
          }
        />

        {/* Test Page Route */}

         <Route path="/test" element={<TestPage />} />
      <Route path="/test-edit" element={<TestEditPage />} />

        <Route path="result" element={<ResultPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
