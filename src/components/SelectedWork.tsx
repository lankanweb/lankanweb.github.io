import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { sampleProjects, ProjectItem } from '../data/siteConfig';
import { ProjectModal } from './ProjectModal';
import { trackEvent } from '../utils/analytics';
import { EditorialHeading, EditorialParagraph } from './EditorialTextReveal';

interface SelectedWorkProps {
  onDiscussProject: (serviceName?: string) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onDiscussProject }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleOpenProject = (project: ProjectItem) => {
    trackEvent('case_study_viewed', { projectName: project.name });
    setSelectedProject(project);
  };

  return (
    <section id="work" className="magnetic-section py-24 sm:py-32 lg:py-36 bg-white border-t border-[#D9DDE2]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        {/* Section Header Container */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16 lg:mb-24"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#0C92FF] mb-3 block">
            Selected Work
          </span>
          <EditorialHeading
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] font-heading tracking-tight mb-4"
          >
            <span className="editorial-word">Good</span>{' '}
            <span className="editorial-word">work</span>{' '}
            <span className="editorial-word">speaks</span>{' '}
            <span className="editorial-word">for</span>{' '}
            <span className="editorial-word">itself.</span>
          </EditorialHeading>
          <EditorialParagraph className="text-base sm:text-lg text-[#666666] leading-relaxed">
            A closer look at the digital experiences and marketing projects we create.
          </EditorialParagraph>
        </motion.div>

        {/* Project Showcases */}
        <div className="space-y-24 lg:space-y-32">
          {sampleProjects.map((project, index) => {
            const isEven = index % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.6,
                  delay: shouldReduceMotion ? 0 : 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image Showcase Container */}
                <div
                  className={`lg:col-span-7 cursor-pointer group ${
                    isEven ? 'lg:col-start-6' : 'lg:col-start-1'
                  }`}
                  onClick={() => handleOpenProject(project)}
                >
                  <div className="relative aspect-[16/10] w-full rounded-lg border border-[#D9DDE2] bg-[#F5F6F7] overflow-hidden transition-all duration-300 group-hover:border-[#0C92FF]/40 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
                  </div>
                </div>

                {/* Text Content */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? 'lg:col-start-1' : 'lg:col-start-8'
                  }`}
                >
                  {/* Category & Location metadata */}
                  <div className="flex items-center gap-2 text-xs font-medium text-[#666666] uppercase tracking-wider mb-3">
                    <span>{project.category}</span>
                    <span aria-hidden="true" className="text-[#D9DDE2]">·</span>
                    <span>{project.clientLocation}</span>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[#111111] tracking-tight mb-4">
                    {project.name}
                  </h3>

                  {/* Services Provided: Clean Unboxed Text with Separators */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#0C92FF] font-medium mb-5">
                    {project.services.map((service, sIdx) => (
                      <span key={service} className="inline-flex items-center">
                        {service}
                        {sIdx < project.services.length - 1 && (
                          <span aria-hidden="true" className="ml-2 text-[#D9DDE2]">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Short Description */}
                  <p className="text-base text-[#666666] leading-relaxed mb-8">
                    {project.description}
                  </p>

                  {/* View Project Action */}
                  <div>
                    <button
                      onClick={() => handleOpenProject(project)}
                      className="group inline-flex items-center gap-2 text-sm font-bold text-[#111111] hover:text-[#0C92FF] transition-colors cursor-pointer py-1"
                    >
                      <span>View Project Case Study</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDiscussProject={onDiscussProject}
      />
    </section>
  );
};
