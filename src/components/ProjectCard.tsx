import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div className="border border-green-600 rounded-md p-4 mb-4 bg-green-900 bg-opacity-10">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-green-300 font-bold text-lg">
          [{index + 1}] {project.name}
        </h3>
        <div className="flex space-x-2">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Github size={16} />
            </a>
          )}
          {project.live && (
            <a 
              href={project.live} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
      
      <p className="text-gray-300 mb-3 text-sm leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech, i) => (
          <span 
            key={i}
            className="px-2 py-1 text-xs bg-gray-800 text-green-300 rounded border border-green-600"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;