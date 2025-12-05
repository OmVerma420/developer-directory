import { useSelector } from "react-redux";
import DeveloperCard from "./DeveloperCard";

export default function DeveloperList() {
  const { list, loading } = useSelector((state) => state.developers);

  if (loading)
    return <p className="text-gray-600 text-center">Loading developers...</p>;

  if (!list.length)
    return <p className="text-gray-500 text-center">No developers found.</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {list.map((dev) => (
        <DeveloperCard key={dev._id} dev={dev} />
      ))}
    </div>
  );
}
