import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDevelopers } from "../features/developers/developerSlice";

import DeveloperList from "../components/DeveloperList";
import FilterBar from "../components/FilterBar";
import SortBar from "../components/SortBar";
import Pagination from "../components/Pagination";

export default function Developers() {
  const dispatch = useDispatch();
  const { filters, loading } = useSelector((state) => state.developers);

  useEffect(() => {
    dispatch(fetchDevelopers(filters));
  }, [dispatch, filters]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Developers</h1>
      </div>

      <div className="space-y-6">
        <FilterBar />
        <SortBar />

        {loading ? (
          <p className="text-gray-600">Loading developers...</p>
        ) : (
          <DeveloperList />
        )}

        <Pagination />
      </div>
    </div>
  );
}
