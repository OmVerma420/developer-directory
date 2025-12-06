import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { toggleTheme } from "../features/theme/themeSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const theme = useSelector((s) => s.theme.mode);
  const dispatch = useDispatch();

  return (
    <nav className="p-4 bg-black dark:bg-gray-900 text-white flex justify-between items-center">
      <Link to="/developers" className="font-bold text-lg">
        Developer Directory
      </Link>

      <div className="flex items-center gap-4">
        {/* 🌗 THEME TOGGLE */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="bg-white text-black dark:bg-gray-700 dark:text-white px-3 py-1 rounded"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {user ? (
          <div className="flex gap-4 items-center">
            <Link
              to="/developers/add"
              className="bg-white text-black px-3 py-1 rounded dark:bg-gray-700 dark:text-white"
            >
              + Add Developer
            </Link>

            <button
              onClick={() => dispatch(logoutUser())}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="bg-white text-black px-3 py-1 rounded dark:bg-gray-700 dark:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gray-300 text-black px-3 py-1 rounded dark:bg-gray-600 dark:text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
