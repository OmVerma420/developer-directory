import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import { getDevelopers } from "./api/api.js";

// Components
import DeveloperForm from "./components/DeveloperForm";
import DeveloperList from "./components/DeveloperList";
import FilterBar from "./components/FilterBar";

export default function App() {
  const [developers, setDevelopers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDevelopers();
  }, []);

  const loadDevelopers = async () => {
    try {
      const { data } = await getDevelopers();
      setDevelopers(data.data);
      setFiltered(data.data);
    } catch (err) {
      toast.error("Failed to load developers");
    }
  };

  // Filter logic
  useEffect(() => {
    let data = [...developers];

    if (role) {
      data = data.filter((dev) => dev.role === role);
    }

    if (search.trim()) {
      data = data.filter((dev) =>
        dev.techStack.some((t) =>
          t.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    setFiltered(data);
  }, [role, search, developers]);

  const handleAddDeveloper = (newDev) => {
    setDevelopers((prev) => [newDev, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />

      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-center">Developer Directory</h1>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <DeveloperForm onAdd={handleAddDeveloper} />

          <div>
            <FilterBar
              role={role}
              setRole={setRole}
              search={search}
              setSearch={setSearch}
            />
            <DeveloperList developers={filtered} />
          </div>
        </div>
      </main>
    </div>
  );
}
