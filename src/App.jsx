import { useState } from "react";
import { SearchBar, Filter, Gallery } from "./components";
function App() {
  const [filteredProjects, setFilteredProjects] = useState([]);
  const handleFilterChange = (filters) => {
    // Aquí implementarías la lógica para filtrar tus proyectos
    // Por ejemplo:
    return;
    // const activeFilters = Object.entries(filters)
    //   .filter(([_, isActive]) => isActive)
    //   .map(([tech]) => tech);

    // if (activeFilters.length === 0) {
    //   setFilteredProjects(projects);
    // } else {
    //   setFilteredProjects(
    //     projects.filter((project) =>
    //       activeFilters.some((tech) => project.technologies.includes(tech))
    //     )
    //   );
    // }
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
