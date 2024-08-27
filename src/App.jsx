import { useEffect, useState } from "react";
import { SearchBar, Filter, Gallery } from "./components";
import projects from "./data/projects.json";
function App() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [filters, setFilters] = useState({
    technologies: {},
    difficulties: {},
  });

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchTerm) => {
    setFilteredProjects(
      projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const applyFilters = () => {
    const activeTechFilters = Object.entries(filters.technologies)
      .filter(([_, isActive]) => isActive)
      .map(([tech]) => tech);

    const activeDifficultyFilters = Object.entries(filters.difficulties)
      .filter(([_, isActive]) => isActive)
      .map(([difficulty]) => difficulty);

    if (
      activeTechFilters.length === 0 &&
      activeDifficultyFilters.length === 0
    ) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter((project) => {
      const matchesTech =
        activeTechFilters.length === 0 ||
        project.technologies.some((tech) => activeTechFilters.includes(tech));

      const matchesDifficulty =
        activeDifficultyFilters.length === 0 ||
        activeDifficultyFilters.includes(project.difficulty);

      return matchesTech && matchesDifficulty;
    });

    setFilteredProjects(filtered);
  };

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center p-4">
        <h1 className="text-3xl font-bold">Frontend Mentor Gallery</h1>
        <div className="flex mt-3 md:mt-0 gap-4">
          <SearchBar handleSearch={handleSearch} />
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </header>
      <Gallery projects={filteredProjects} />
    </>
  );
}

export default App;
