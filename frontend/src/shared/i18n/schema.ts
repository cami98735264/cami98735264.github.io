import { z } from "zod";

const technologySchema = z.object({
  name: z.string(),
  backgroundColor: z.string(),
  textColor: z.string(),
});

const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  onlineUrl: z.url().optional(),
  githubUrl: z
    .object({
      frontend: z.url().optional(),
      backend: z.url().optional(),
    })
    .optional(),
  backgroundUrl: z.url(),
  screenshots: z.array(z.url()),
  projectNotes: z.array(z.string()),
  technologies: z.array(technologySchema),
});

const experienceSchema = z.object({
  company: z.string(),
  position: z.string(),
  location: z.string().optional(),
  current: z.boolean().optional(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
  tasksList: z.array(z.string()),
  technologiesList: z.array(technologySchema),
  screenshots: z.array(z.url()).optional(),
});

const educationSchema = z.object({
  institution: z.string(),
  area: z.string(),
  studyType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  courses: z.array(z.string()),
});

const languageSchema = z.object({
  language: z.string(),
  fluency: z.string(),
  level: z.string().optional(),
});

const navLinks = z.object({
  projects: z.string(),
  technologies: z.string(),
  experience: z.string(),
  education: z.string(),
  languages: z.string(),
});

export const translationsSchema = z.object({
  footer: navLinks.extend({ contact: z.string() }),
  navbar: navLinks.extend({
    languageInput: z.object({
      options: z.object({
        en: z.string(),
        es: z.string(),
      }),
    }),
  }),
  "404": z.object({
    title: z.string(),
    description: z.string(),
    backToHome: z.string(),
  }),
  sections: z.object({
    aboutMe: z.object({
      containerId: z.string(),
      title: z.string(),
      whatsappText: z.string(),
      emailTextBody: z.string(),
      emailTextSubject: z.string(),
      description: z.string(),
      descriptionTitle: z.string(),
      locationLabel: z.string().default("Colombia · Remote"),
      contactMe: z.string(),
      downloadCV: z.string(),
      downloadCVUrl: z.url(),
    }),
    contactMe: z.object({
      containerId: z.string(),
      title: z.string(),
      description: z.string(),
      form: z.object({
        name: z.string(),
        email: z.string(),
        message: z.string(),
        send: z.string(),
        errors: z.object({
          required: z.string(),
          invalidEmail: z.string(),
        }),
      }),
    }),
    projects: z.object({
      containerId: z.string(),
      title: z.string(),
      description: z.string(),
      viewGithub: z.string(),
      viewOnline: z.string(),
      projectsNotes: z.string(),
      viewProject: z.string(),
      showMore: z.string().default("Show more"),
      showLess: z.string().default("Show less"),
      list: z.array(projectSchema),
      count: z.object({ description: z.string() }),
    }),
    technologies: z.object({
      containerId: z.string(),
      title: z.string(),
      description: z.string(),
      categories: z.object({
        frontend: z.string(),
        backend: z.string(),
        databases: z.string(),
        designTools: z.string(),
        deployment: z.string(),
        aiMl: z.string().default("AI / ML"),
        integrations: z.string().default("Integrations"),
        testing: z.string().default("Testing & QA"),
        observability: z.string().default("Observability"),
        architecture: z.string().default("Architecture & Process"),
      }),
      count: z.object({ description: z.string() }),
    }),
    experience: z.object({
      containerId: z.string(),
      title: z.string(),
      description: z.string(),
      currentLabel: z.string().default("Present"),
      experienceList: z.array(experienceSchema),
    }),
    education: z.object({
      containerId: z.string().default("Education"),
      title: z.string().default("Education"),
      description: z
        .string()
        .default("Formal training that backs my self-taught path."),
      coursesLabel: z.string().default("Coursework"),
      list: z.array(educationSchema),
    }),
    languages: z.object({
      containerId: z.string().default("Languages"),
      title: z.string().default("Languages"),
      description: z
        .string()
        .default("Languages I work and communicate in."),
      list: z.array(languageSchema),
    }),
  }),
});

export type Translations = z.infer<typeof translationsSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Technology = z.infer<typeof technologySchema>;
export type Education = z.infer<typeof educationSchema>;
export type Language = z.infer<typeof languageSchema>;
