import { ProjectsCard } from "./ProjectsCard";

export const Gallery = ({ projects }) => {
  return (
    <>
      {projects && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectsCard key={project.id} project={project} />
          ))}
        </section>
      )}
    </>
  );
};
