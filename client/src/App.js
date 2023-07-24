import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/publicRoute";
import ApplyNgo from "./pages/ApplyNgo";
import Notifications from "./pages/Notifications";
import Userslist from "./pages/Admin/Userslist";
import NgosList from "./pages/Admin/NgosList";
import Profile from "./pages/Ngo/Profile";
import BookDonation from "./pages/Ngo/BookDonation";
import ViewNgoData from "./pages/ViewNgoData";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentComponent from "./PaymentWidget/PaymentComponent";
import {
  Container,
  Jumbotron,
  Button,
  Image,
  TabContainer,
} from "react-bootstrap";
import UserProfile from "./pages/UserProfile";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/apply-ngo"
          element={
            <ProtectedRoute>
              <ApplyNgo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/userslist"
          element={
            <ProtectedRoute>
              <Userslist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/ngoslist"
          element={
            <ProtectedRoute>
              <NgosList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ngo/profile/:userId"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-donation/:ngoId"
          element={
            <ProtectedRoute>
              <BookDonation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/UserProfile/:userId"
          element={
            <ProtectedRoute>
              <UserProfile></UserProfile>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-ngo-data/:ngoId"
          element={
            <ProtectedRoute>
              <ViewNgoData />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
