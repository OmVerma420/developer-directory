import { useDispatch, useSelector } from "react-redux";
import { setFilters, fetchDevelopers } from "../features/developers/developerSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const { filters, total } = useSelector((s) => s.developers);

  const totalPages = Math.ceil(total / filters.limit);

  if (totalPages <= 1) return null; // hide pagination if only 1 page

  const changePage = (page) => {
    const updated = { ...filters, page };
    dispatch(setFilters(updated));
    dispatch(fetchDevelopers(updated));
  };

  return (
    <div className="flex gap-2 mt-6 justify-center">
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={index}
            onClick={() => changePage(pageNumber)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              filters.page === pageNumber
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}
