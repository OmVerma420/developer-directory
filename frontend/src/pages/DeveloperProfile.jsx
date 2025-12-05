import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeveloper } from "../features/developers/developerSlice";

export default function DeveloperProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [dev, setDev] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const res = await api.get(`/developers/${id}`);
      setDev(res.data.data);
    } catch (err) {
      toast.error("Developer not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this developer?")) return;
    await dispatch(deleteDeveloper(id));
    navigate("/developers");
  };

  if (loading || !dev) return <p className="p-6 text-center">Loading...</p>;

  const isOwner = user && dev.createdBy === user._id;
  const joiningDate = dev.joiningDate || dev.createdAt;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">

      {/* --- Profile Image --- */}
      {dev.photoURL && (
        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 shadow-md bg-gray-100">
          <img
            src={dev.photoURL}
            alt={dev.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* --- Name & Role --- */}
      <h1 className="text-3xl font-bold text-center">{dev.name}</h1>
      <p className="text-gray-600 text-center mb-3">{dev.role}</p>

      {/* --- Joining Date & Experience --- */}
      <div className="text-center text-gray-700">
        <p>
          Joined:{" "}
          <span className="font-medium">
            {joiningDate ? new Date(joiningDate).toLocaleDateString() : "N/A"}
          </span>
        </p>

        <p className="mt-2">
          Experience:{" "}
          <span className="font-semibold">{dev.experience} years</span>
        </p>
      </div>

      {/* --- Tech Stack --- */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {dev.techStack?.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-200 rounded-full text-gray-700 text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* --- Description --- */}
      <p className="mt-6 text-gray-800 text-center leading-relaxed">
        {dev.description || "No description provided."}
      </p>

      {/* --- Edit & Delete Buttons --- */}
      {isOwner && (
        <div className="flex gap-4 mt-6 justify-center">
          <Link
            to={`/developers/edit/${dev._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded shadow"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
