import Dashboard from './modules/Dashboard/Dashboard';
import Form from './modules/Form/index';
import { Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user:token') !== null || true;

  if (!isLoggedIn) {
    // If not logged in, redirect to the sign-in page
    return <Navigate to="/user/sign_in" />;
  }else if(isLoggedIn && ['/sign_in', '/sign_up'].includes(window.location.pathname)){
    console.log('Object :>>');
    return <Navigate to={'/'} />
  }

  // If logged in, render the children
  return children;
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/sign_in"
        element={
        <ProtectedRoute>
          <Form isSignInPage={true} />
        </ProtectedRoute>
        }
      />
      <Route
        path="/user/sign_up"
        element={ <ProtectedRoute>
          <Form isSignInPage={false} />
        </ProtectedRoute>
      }
      />
    </Routes>
  );
 
}

export default App;
