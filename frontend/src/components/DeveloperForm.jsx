import { useState } from "react";
import { createDeveloper } from "../api/api";
import { toast } from "react-hot-toast";

export default function DeveloperForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    techStack: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name) return toast.error("Name is required!");
    if (!form.role) return toast.error("Role is required!");
    if (!form.experience || Number(form.experience) < 0)
      return toast.error("Experience must be valid!");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        ...form,
        experience: Number(form.experience),
      };

      const { data } = await createDeveloper(payload);
      toast.success("Developer added!");

      onAdd(data.data);
      setForm({ name: "", role: "", techStack: "", experience: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding developer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-5 border border-gray-100"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold tracking-tight text-gray-800">
        Add Developer
      </h2>

      {/* Input Group */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter developer name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2.5 rounded-xl text-gray-800 
                     focus:ring-2 focus:ring-black focus:outline-none transition-all"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2.5 rounded-xl text-gray-800
                     bg-white focus:ring-2 focus:ring-black focus:outline-none transition-all"
        >
          <option value="">Select role</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full-Stack">Full-Stack</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Tech Stack</label>
        <input
          type="text"
          name="techStack"
          placeholder="React, Node, MongoDB"
          value={form.techStack}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2.5 rounded-xl text-gray-800
                     focus:ring-2 focus:ring-black focus:outline-none transition-all"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-600">Experience</label>
        <input
          type="number"
          name="experience"
          placeholder="Years of experience"
          value={form.experience}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-2.5 rounded-xl text-gray-800
                     focus:ring-2 focus:ring-black focus:outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl text-white font-semibold bg-black hover:bg-gray-900 
                   transition-all disabled:opacity-60 shadow-md"
      >
        {loading ? "Saving..." : "Add Developer"}
      </button>
    </form>
  );
}
