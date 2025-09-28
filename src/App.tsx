import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from './pages/Login';
import UsersList from './pages/UsersList';
import ProtectedRoute from './middleware/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';
import { Suspense } from 'react';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<LoginLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/users" element={<UsersList />} />
              <Route path="/" element={<Navigate to="/users" replace />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
