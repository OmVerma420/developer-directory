import { Link } from "react-router-dom";

export default function DeveloperCard({ dev }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition flex flex-col">
      
      {dev.photoURL && (
        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-gray-100">
          <img
            src={dev.photoURL}
            alt={dev.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      <h3 className="font-semibold text-xl text-gray-800">{dev.name}</h3>

      <span className="text-xs px-2 py-1 bg-gray-900 text-white rounded-full inline-block mt-2">
        {dev.role}
      </span>

      <p className="text-sm mt-3 text-gray-700">
        Experience: <b>{dev.experience} yrs</b>
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {dev.techStack?.map((tech, i) => (
          <span
            key={i}
            className="text-xs bg-gray-200 px-3 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      <Link
        to={`/developers/${dev._id}`}
        className="text-blue-600 mt-auto pt-4 inline-block text-sm font-medium"
      >
        View Profile →
      </Link>
    </div>
  );
}
