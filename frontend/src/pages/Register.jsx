import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading } = useSelector((s) => s.auth);

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // If logged in already → redirect automatically
  useEffect(() => {
    if (user) navigate("/developers");
  }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(form));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/developers");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow bg-white rounded mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="border p-3 rounded w-full"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="border p-3 rounded w-full"
          placeholder="Email Address"
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
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
