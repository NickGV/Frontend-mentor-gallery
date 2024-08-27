import { useEffect, useState } from "react";

export const Filter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    Technologies: {
      "HTML/CSS": false,
      "HTML/CSS/JS": false,
      React: false,
    },
    Difficulty: {
      Newbie: false,
      Junior: false,
      Intermediate: false,
      Advanced: false,
      Guru: false,
    },
  });

  // useEffect(() => {
  //   // Inicializar filtros basados en las tecnologías únicas de todos los proyectos
  //   const allTechnologies = [
  //     ...new Set(projects.flatMap((p) => p.technologies)),
  //   ];
  //   const initialFilters = Object.fromEntries(
  //     allTechnologies.map((tech) => [tech, false])
  //   );
  //   setFilters(initialFilters);
  // }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleFilterChange = (category, item) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [item]: !prevFilters[category][item],
      },
    }));
    onFilterChange(filters);
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
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                      className="text-gray-700 text-sm cursor-pointer hover:text-black "
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
