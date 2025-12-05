import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDeveloper } from "../features/developers/developerSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DeveloperForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    techStack: "",
    experience: "",
    description: "",
  });

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false); // 🔥 Loader state

  const validate = () => {
    if (form.name.trim().length < 2)
      return toast.error("Name must be at least 2 characters");
    if (!form.role) return toast.error("Role is required");
    if (!form.techStack.trim()) return toast.error("Tech stack is required");
    if (!form.experience) return toast.error("Experience is required");
    if (isNaN(form.experience)) return toast.error("Experience must be a number");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true); // 🔥 Show loader

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("techStack", form.techStack);
    fd.append("experience", form.experience);
    fd.append("description", form.description);
    if (photo) fd.append("photo", photo);

    const result = await dispatch(createDeveloper(fd));

    setLoading(false); // 🔥 Hide loader

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/developers");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Developer</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="border p-2 rounded w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="border p-2 rounded w-full"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Full-Stack</option>
        </select>

        <input
          className="border p-2 rounded w-full"
          placeholder="React, Node, MongoDB"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
        />

        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Experience"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        <textarea
          className="border p-2 rounded w-full"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files?.[0])}
        />

        {/* 🔥 BUTTON WITH LOADER */}
        <button
          className={`p-2 rounded w-full text-white font-medium
            ${loading ? "bg-gray-700" : "bg-black hover:bg-gray-900"} 
          `}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
              Adding...
            </span>
          ) : (
            "Add Developer"
          )}
        </button>
      </form>
    </div>
  );
}
