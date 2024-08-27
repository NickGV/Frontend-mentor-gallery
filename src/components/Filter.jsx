import { useEffect, useState } from "react";
import projects from "../data/projects.json";

export const Filter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const allTechnologies = [
      ...new Set(projects.flatMap((p) => p.technologies)),
    ];
    const allDifficulties = [...new Set(projects.map((p) => p.difficulty))];
    const initialFilters = {
      technologies: allTechnologies.reduce((acc, tech) => {
        acc[tech] = false;
        return acc;
      }, {}),
      difficulties: allDifficulties.reduce((acc, difficulty) => {
        acc[difficulty] = false;
        return acc;
      }, {}),
    };
    setFilters(initialFilters);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilterChange = (category, item) => {
    // Actualizar el estado de los filtros (filters) utilizando la función 'setFilters'.
    setFilters((prevFilters) => ({
      // Primero, se mantiene el resto de los filtros existentes usando el operador spread '...'.
      ...prevFilters,

      // Luego, se actualiza la categoría específica del filtro (por ejemplo, 'technologies' o 'difficulties').
      [category]: {
        // Mantener los filtros existentes dentro de esta categoría específica.
        ...prevFilters[category],

        // Cambiar el estado del filtro específico ('item') dentro de esta categoría.
        // Si estaba 'true' (activo), se convierte en 'false' (inactivo) y viceversa.
        [item]: !prevFilters[category][item],
      },
    }));

    // Después de actualizar el estado de los filtros, se llama a la función 'onFilterChange'
    // con los nuevos filtros. Esto es para asegurarse de que el componente padre
    // (que recibe 'onFilterChange' como prop) también se entere del cambio.
    onFilterChange({
      // Copia de los filtros actuales.
      ...filters,

      // Actualización de la categoría específica, similar a lo que se hizo en 'setFilters'.
      [category]: {
        ...filters[category],

        // Cambio del estado del filtro específico en la copia local de 'filters'.
        [item]: !filters[category][item],
      },
    });
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center items-center gap-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
          onClick={toggleDropdown}
        >
          Filters
          {isOpen ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 md:w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-2 grid grid-cols-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {Object.entries(filters).map(([category, items]) => (
              <div key={category} className="px-4 py-2">
                <h3 className=" font-medium text-gray-900">{category}</h3>
                {Object.entries(items).map(([item, isChecked]) => (
                  <div key={item} className="flex items-start">
                    <input
                      id={`filter-${category}-${item}`}
                      name={`filter-${category}`}
                      type="checkbox"
                      className=""
                      checked={isChecked}
                      onChange={() => handleFilterChange(category, item)}
                    />

                    <label
                      htmlFor={`filter-${category}-${item}`}
                      className="text-gray-700 text-xs md:text-sm cursor-pointer hover:text-black "
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
