# Portfolio Website

A modern, responsive portfolio website built with Astro, React, and TypeScript. This project showcases professional work, skills, and experiences with a focus on performance and user experience.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build) - A modern static site builder
- **UI Library**: React 19
- **Styling**: Styled Components
- **Animations**: AOS (Animate On Scroll)
- **Icons**: Iconify/Devicon
- **Internationalization**: Astro built-in i18n
- **Deployment**: Node.js

## 📁 Project Structure

```text
frontend/
├── public/          # Static assets (images, fonts, etc.)
├── src/
│   ├── assets/      # Project assets (images, fonts, etc.)
│   ├── components/  # Reusable components
│   │   ├── sections/    # Main page sections
│   │   │   ├── AboutMe.astro      # About section
│   │   │   ├── ContactMe.astro    # Contact section
│   │   │   ├── Projects.astro     # Projects showcase
│   │   │   ├── Tecnologies.astro  # Technologies section
│   │   │   ├── WorkExperience.astro # Work experience section
│   │   │   └── ProjectPage.astro  # Individual project page
│   │   ├── Button.astro           # Button component
│   │   ├── Button.jsx             # React button component
│   │   ├── Container404.astro     # 404 page container
│   │   ├── Experience.astro       # Experience component
│   │   ├── Footer.astro           # Site footer
│   │   ├── Navbar.astro           # Navigation bar
│   │   ├── PageSection.astro      # Page section wrapper
│   │   ├── Project.jsx            # Project component
│   │   ├── ProjectPageBody.astro  # Project page body
│   │   ├── ProjectPageHeader.astro # Project page header
│   │   ├── TechnologyLabel.astro  # Technology label component
│   │   └── TechnologiesList.astro # Technologies list component
│   ├── icons/       # Custom icons
│   ├── layouts/     # Page layouts
│   ├── pages/       # Astro pages
│   │   ├── index.astro            # Home page
│   │   ├── [lang]/                # Language-specific pages
│   │   └── projects/              # Project pages
│   ├── utils/       # Utility functions
│   │   ├── linkElements.ts        # Link handling utilities
│   │   └── utils.ts               # General utilities
│   └── i18n.ts      # Internationalization configuration
├── locales/         # Translation files
└── .astro/          # Astro build cache
```

## 🛠️ Development

### Prerequisites

- Node.js (LTS version recommended)
- npm or bun package manager

### Installation

```bash
# Install dependencies
npm install
# or
bun install
```

### Available Scripts

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `npm run dev`     | Start development server at `localhost:4321`     |
| `npm run build`   | Build production site to `./dist/`               |
| `npm run preview` | Preview production build locally                 |
| `npm run astro`   | Run Astro CLI commands                           |

## 🌐 Features

- **Internationalization**: Multi-language support
- **Responsive Design**: Mobile-first approach
- **Animations**: Smooth scroll animations
- **Performance**: Optimized for fast loading
- **SEO**: Built-in sitemap generation

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
