import type { FC } from 'react';
import React from 'react';

import { Parragraph, ProjectCard } from '@/components/common';
import { PageTitle } from '@/components/common/elements';
import { getAllProjectsForCards } from '@/graphql/Project';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type { ProjectCardType } from '@/types/component.types';
import { axiosGraphQL } from '@/utils/axios';

type ProjectsType = {
  projects: ProjectCardType[];
};

const Projects: FC<ProjectsType> = ({ projects }) => {
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <PageTitle>Projects</PageTitle>
      <Parragraph className="mt-0 text-[1.15rem]">
        Showcase of my work on FullStack development.
      </Parragraph>
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((item) => (
          <ProjectCard key={item.id} project={item} />
        ))}
      </section>
    </Main>
  );
};

export const getServerSideProps = async () => {
  const projectsRes = await axiosGraphQL.post(`/`, {
    query: getAllProjectsForCards,
  });
  const projects = projectsRes.data?.data?.Projects?.docs;
  return {
    props: {
      projects,
    },
  };
};

export default Projects;
