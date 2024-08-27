import { useEffect, useState } from "react";
import { SearchBar, Filter, Gallery } from "./components";
import projects from "./data/projects.json";
function App() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    const activeFilters = Object.entries(filters)
      .filter(([_, isActive]) => isActive)
      .map(([tech]) => tech);

    if (activeFilters.length === 0) {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) =>
          project.technologies.some((tech) => activeFilters.includes(tech))
        )
      );
    }
  };
  return (
    <>
      <header className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold">Frontend Mentor Gallery</h1>
        <div className="flex gap-4">
          <SearchBar />
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </header>
      <Gallery projects={filteredProjects} />
    </>
  );
}

export default App;
