import React, { useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, Layers, Cpu, MapPin } from 'lucide-react';
import { ProjectItem } from '../data/siteConfig';
import { trackEvent } from '../utils/analytics';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onDiscussProject: (serviceName?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onDiscussProject }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleDiscuss = () => {
    trackEvent('service_discussed', { project: project.name });
    onClose();
    onDiscussProject(project.services[0] || 'Website Development');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl border border-[#D9DDE2] p-6 sm:p-8 lg:p-10 text-[#111111]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Project Modal"
          className="absolute top-6 right-6 p-2 text-[#666666] hover:text-[#111111] hover:bg-[#F5F6F7] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#666666] uppercase tracking-wider mb-2 font-medium">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#0C92FF]" />
              {project.clientLocation}
            </span>
          </div>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold font-heading text-[#111111]">
            {project.name}
          </h2>
        </div>

        {/* Project Image Frame */}
        <div className="relative aspect-[16/10] w-full rounded border border-[#D9DDE2] overflow-hidden bg-[#F5F6F7] mb-8">
          <img
            src={project.image}
            alt={project.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overview & Scope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 pb-8 border-b border-[#D9DDE2]">
          <div className="lg:col-span-7">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-3">Project Overview</h3>
            <p className="text-base text-[#666666] leading-relaxed mb-6 font-normal">
              {project.overview}
            </p>

            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-3">Key Deliverables</h3>
            <ul className="space-y-2.5">
              {project.keyDeliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#0C92FF] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#F5F6F7] p-6 rounded border border-[#D9DDE2]">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                <Layers className="w-3.5 h-3.5 text-[#0C92FF]" />
                <span>Scope of Services</span>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#666666]">
                {project.services.map((svc, i) => (
                  <span key={svc}>
                    {svc}
                    {i < project.services.length - 1 && <span className="ml-2 text-[#D9DDE2]">·</span>}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
                <Cpu className="w-3.5 h-3.5 text-[#0C92FF]" />
                <span>Technology Stack</span>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-[#666666] font-mono">
                {project.technologies.map((tech, i) => (
                  <span key={tech}>
                    {tech}
                    {i < project.technologies.length - 1 && <span className="ml-2 text-[#D9DDE2]">/</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#D9DDE2]">
              <span className="text-xs font-medium text-[#666666] block mb-1">Impact Focus</span>
              <p className="text-xs text-[#111111] font-medium leading-normal">
                {project.impactStatement}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#666666]">
            Ready to build a digital solution for your business?
          </span>
          <button
            onClick={handleDiscuss}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0C92FF] hover:bg-[#004E8D] rounded transition-colors cursor-pointer"
          >
            <span>Discuss a Similar Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
