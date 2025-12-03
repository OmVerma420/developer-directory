

export default function FilterBar({ role, setRole, search, setSearch }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      {/* Role Filter */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full md:w-48 px-4 py-2.5 border border-gray-300 rounded-xl 
                   bg-white text-gray-800 shadow-sm
                   focus:ring-2 focus:ring-black focus:outline-none transition-all"
      >
        <option value="">All Roles</option>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Full-Stack">Full-Stack</option>
      </select>

      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by tech (e.g., React)"
        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl 
                   bg-white text-gray-800 shadow-sm
                   placeholder:text-gray-400
                   focus:ring-2 focus:ring-black focus:outline-none transition-all"
      />
    </div>
  );
}
