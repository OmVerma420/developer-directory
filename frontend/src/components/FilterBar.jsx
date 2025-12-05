import { useDispatch, useSelector } from "react-redux";
import { setFilters, fetchDevelopers } from "../features/developers/developerSlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.developers);

  const applyChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value, page: 1 };

    dispatch(setFilters(updatedFilters));
    dispatch(fetchDevelopers(updatedFilters));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-4">
      
      <select
        value={filters.role}
        onChange={(e) => applyChange("role", e.target.value)}
        className="border p-2 rounded w-full sm:w-48"
      >
        <option value="">All Roles</option>
        <option>Frontend</option>
        <option>Backend</option>
        <option>Full-Stack</option>
      </select>

      <input
        className="border p-2 rounded w-full"
        placeholder="Search by name or technology..."
        value={filters.search}
        onChange={(e) => applyChange("search", e.target.value)}
      />
    </div>
  );
}
