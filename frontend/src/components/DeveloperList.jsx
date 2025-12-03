

export default function DeveloperList({ developers }) {
  if (!developers.length)
    return (
      <p className="text-gray-500 text-sm mt-3 text-center">
        No developers found.
      </p>
    );

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {developers.map((dev) => (
        <div
          key={dev._id}
          className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 
                     hover:shadow-lg transition-all duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-xl text-gray-800 tracking-tight">
              {dev.name}
            </h3>

            <span
              className="text-xs font-medium px-3 py-1 rounded-full
                         bg-gradient-to-r from-black to-gray-700 text-white shadow-sm"
            >
              {dev.role}
            </span>
          </div>

          {/* Experience */}
          <p className="text-sm text-gray-600 mb-3">
            Experience:{" "}
            <span className="font-semibold text-gray-800">
              {dev.experience} yrs
            </span>
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-2">
            {dev.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 bg-gray-100 border border-gray-200 
                           rounded-full text-gray-700 font-medium 
                           hover:bg-gray-200 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
