import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();

  return (
    <nav className="p-4 bg-black text-white flex justify-between items-center">
      <Link to="/developers" className="font-bold text-lg">
        Developer Directory
      </Link>

      {user ? (
        <div className="flex gap-4 items-center">
          <Link
            to="/developers/add"
            className="bg-white text-black px-3 py-1 rounded"
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
          <Link to="/login" className="bg-white text-black px-3 py-1 rounded">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-gray-300 text-black px-3 py-1 rounded"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
