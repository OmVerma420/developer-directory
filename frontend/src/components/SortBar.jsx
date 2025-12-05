import { useDispatch, useSelector } from "react-redux";
import { setFilters, fetchDevelopers } from "../features/developers/developerSlice";

export default function SortBar() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.developers);

  const changeSort = (value) => {
    const [sortBy, sortOrder] = value.split("-");
    const updated = { ...filters, sortBy, sortOrder, page: 1 };

    dispatch(setFilters(updated));
    dispatch(fetchDevelopers(updated));
  };

  return (
    <select
      className="border p-2 rounded w-full sm:w-60"
      value={`${filters.sortBy}-${filters.sortOrder}`}
      onChange={(e) => changeSort(e.target.value)}
    >
      <option value="experience-desc">Experience: High → Low</option>
      <option value="experience-asc">Experience: Low → High</option>
      <option value="name-asc">Name: A → Z</option>
      <option value="name-desc">Name: Z → A</option>
    </select>
  );
}
