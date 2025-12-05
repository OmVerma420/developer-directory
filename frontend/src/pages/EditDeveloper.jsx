import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { toast } from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["Frontend", "Backend", "Full-Stack"]),
  techStack: z.string().min(1, "Tech stack is required"),
  experience: z.string(),
  description: z.string().optional(),
});

export default function EditDeveloper() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    loadDeveloper();
  }, [id]);

  const loadDeveloper = async () => {
    try {
      const res = await api.get(`/developers/${id}`);
      const dev = res.data.data;

      setForm({
        name: dev.name,
        role: dev.role,
        techStack: dev.techStack.join(", "),
        experience: dev.experience.toString(),
        description: dev.description || "",
      });
    } catch (err) {
      toast.error("Failed to load developer");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = schema.safeParse(form);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("techStack", form.techStack);
    fd.append("experience", form.experience);
    fd.append("description", form.description || "");

    if (photo) fd.append("photo", photo);

    try {
      await api.put(`/developers/${id}`, fd);
      
      navigate(`/developers/${id}`);
    } catch {
      toast.error("Failed to update developer");
    }
  };

  if (!form) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Edit Developer</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="border p-3 rounded w-full"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full Name"
        />

        <select
          className="border p-3 rounded w-full"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>Frontend</option>
          <option>Backend</option>
          <option>Full-Stack</option>
        </select>

        <input
          className="border p-3 rounded w-full"
          value={form.techStack}
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          placeholder="React, Node, MongoDB"
        />

        <input
          type="number"
          className="border p-3 rounded w-full"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          placeholder="Experience in years"
        />

        <textarea
          className="border p-3 rounded w-full"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          placeholder="Short description about developer"
        />

        <input
          type="file"
          accept="image/*"
          className="text-sm"
          onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        />

        <button className="bg-black text-white py-3 rounded w-full font-medium hover:bg-gray-900">
          Save Changes
        </button>
      </form>
    </div>
  );
}
