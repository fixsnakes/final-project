import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { Navigate } from "react-router-dom";
import { logout } from "../store/authSlice";

export default function Profile() {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout()); // xóa user khỏi Redux state và localStorage
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-xl font-bold mb-4">Profile Information</h1>
      <div className="border p-4 rounded-lg shadow">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-20 h-20 rounded-full mb-4"
        />
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
