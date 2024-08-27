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
  const applyFilters = () => {
    // Obtener los filtros activos para tecnologías.
    // Object.entries convierte el objeto 'filters.technologies' en un array de pares [clave, valor].
    // Luego, 'filter' selecciona solo los elementos donde 'isActive' (valor) es true.
    // Finalmente, 'map' extrae solo las claves (nombres de tecnologías) que están activas.
    const activeTechFilters = Object.entries(filters.technologies)
      .filter(([_, isActive]) => isActive) // Filtra solo las tecnologías activas
      .map(([tech]) => tech); // Extrae los nombres de las tecnologías activas

    // Obtener los filtros activos para dificultades.
    // El proceso es similar al de las tecnologías: se filtran las dificultades activas
    // y luego se extraen sus nombres.
    const activeDifficultyFilters = Object.entries(filters.difficulties)
      .filter(([_, isActive]) => isActive) // Filtra solo las dificultades activas
      .map(([difficulty]) => difficulty); // Extrae los nombres de las dificultades activas

    // Si no hay filtros activos en tecnologías ni en dificultades,
    // se restablecen los proyectos filtrados al estado original (todos los proyectos).
    if (
      activeTechFilters.length === 0 &&
      activeDifficultyFilters.length === 0
    ) {
      setFilteredProjects(projects); // Restablece todos los proyectos si no hay filtros
      return; // Termina la ejecución de la función
    }

    // Filtrar los proyectos según las tecnologías y dificultades activas.
    const filtered = projects.filter((project) => {
      // Verificar si el proyecto coincide con los filtros de tecnologías.
      // Si no hay filtros activos para tecnologías, considera que todos los proyectos coinciden.
      // Si hay filtros activos, verifica si alguna tecnología del proyecto está en los filtros activos.
      const matchesTech =
        activeTechFilters.length === 0 ||
        project.technologies.some((tech) => activeTechFilters.includes(tech));

      // Verificar si el proyecto coincide con los filtros de dificultades.
      // Si no hay filtros activos para dificultades, considera que todos los proyectos coinciden.
      // Si hay filtros activos, verifica si la dificultad del proyecto está en los filtros activos.
      const matchesDifficulty =
        activeDifficultyFilters.length === 0 ||
        activeDifficultyFilters.includes(project.difficulty);

      // El proyecto se incluye en los resultados filtrados solo si coincide con ambos filtros:
      // tecnologías y dificultades.
      return matchesTech && matchesDifficulty;
    });

    // Actualizar el estado con los proyectos que coinciden con los filtros aplicados.
    setFilteredProjects(filtered);
  };

  return (
    <>
      <header className="flex flex-col md:flex-row justify-between items-center p-4">
        <h1 className="text-3xl font-bold">Frontend Mentor Gallery</h1>
        <div className="flex mt-3 md:mt-0 gap-4">
          <SearchBar />
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </header>
      <Gallery projects={filteredProjects} />
    </>
  );
}

export default App;
