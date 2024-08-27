export const ProjectsCard = ({ project }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">{project.title}</h2>
        <p className="text-gray-700 text-base">{project.description}</p>
        <div className="mt-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mr-4"
          >
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};
