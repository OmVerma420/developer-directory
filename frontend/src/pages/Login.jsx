import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  // If user is already logged in → redirect automatically
  useEffect(() => {
    if (user) navigate("/developers");
  }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(form));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/developers");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow bg-white rounded mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="border p-3 rounded w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="border p-3 rounded w-full"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="bg-black text-white py-3 rounded w-full font-medium"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 font-medium hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
