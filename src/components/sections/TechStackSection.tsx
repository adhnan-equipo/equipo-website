// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { TechCategory, Technology } from '@/types/database';
// import AnimatedSection from '../ui/AnimatedSection';
// import StaggeredList from '../ui/StaggeredList';

// interface TechStackSectionProps {
//   categories: TechCategory[];
//   technologies: Technology[];
// }

// const TechStackSection: React.FC<TechStackSectionProps> = ({ 
//   categories, 
//   technologies 
// }) => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(
//     categories.length > 0 ? categories[0].id : null
//   );

//   const filteredTechnologies = activeCategory
//     ? technologies.filter(tech => tech.category_id === activeCategory)
//     : technologies;

//   // Group technologies for rendering
//   const groupedTechnologies = filteredTechnologies.reduce<Technology[][]>(
//     (groups, technology, index) => {
//       const groupIndex = Math.floor(index / 5);
//       if (!groups[groupIndex]) {
//         groups[groupIndex] = [];
//       }
//       groups[groupIndex].push(technology);
//       return groups;
//     },
//     []
//   );

//   return (
//     <section className="py-20 bg-lightGray">
//       <div className="container mx-auto px-4">
//         <AnimatedSection>
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-darkBlue mb-3">
//               Our Tech Stack
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               We leverage cutting-edge technologies to deliver robust and scalable healthcare solutions
//             </p>
//           </div>
//         </AnimatedSection>

//         {/* Category Filter */}
//         {categories.length > 0 && (
//           <AnimatedSection delay={0.2} className="mb-12">
//             <div className="flex flex-wrap justify-center gap-3">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   onClick={() => setActiveCategory(category.id)}
//                   className={`px-4 py-2 rounded-full transition-all ${
//                     activeCategory === category.id
//                       ? 'bg-primary-500 text-white shadow-md'
//                       : 'bg-white text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <span className="font-medium">{category.name}</span>
//                 </button>
//               ))}
//             </div>
//           </AnimatedSection>
//         )}

//         {/* Tech Stack Grid - Staggered animation for each row */}
//         <div className="space-y-6">
//           {groupedTechnologies.map((group, groupIndex) => (
//             <StaggeredList
//               key={groupIndex}
//               delay={0.3 + groupIndex * 0.1}
//               staggerDelay={0.05}
//               containerClassName="flex flex-wrap justify-center gap-4 md:gap-6"
//             >
//               {group.map((tech) => (
//                 <a
//                   key={tech.id}
//                   href={tech.website_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all flex flex-col items-center w-24 md:w-32 h-24 md:h-32"
//                 >
//                   <div className="h-12 w-12 md:h-16 md:w-16 relative mb-2">
//                     <Image
//                       src={tech.logo_url}
//                       alt={tech.name}
//                       fill
//                       className="object-contain"
//                       sizes="(max-width: 768px) 48px, 64px"
//                     />
//                   </div>
//                   <p className="text-xs md:text-sm text-center font-medium text-gray-700 line-clamp-2">
//                     {tech.name}
//                   </p>
//                 </a>
//               ))}
//             </StaggeredList>
//           ))}
//         </div>

//         {/* If no technologies are available */}
//         {filteredTechnologies.length === 0 && (
//           <div className="text-center py-8 text-gray-500">
//             No technologies found for this category.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default TechStackSection;