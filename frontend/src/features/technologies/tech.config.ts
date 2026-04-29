export type CategoryKey =
  | "frontend"
  | "backend"
  | "databases"
  | "designTools"
  | "deployment"
  | "aiMl"
  | "integrations"
  | "testing"
  | "observability"
  | "architecture";

export type RenderMode = "icon" | "text";

/**
 * Each entry is either:
 * - a string: the legacy shape used by `mode: "icon"` categories. The string is
 *   either a devicon name (`localIcon: false`) or a local SVG file name
 *   (`localIcon: true`). The display label is the uppercase string.
 * - an object: explicit `name` + full iconify `icon` ID (e.g. `simple-icons:cypress`)
 *   plus an optional `color` brand hex. When `icon` is omitted, the chip renders
 *   text-only. When `color` is omitted, the icon stays monochrome (inherits the
 *   chip's tonal color) — used for brands whose own color reads poorly on dark.
 */
export type TechItem =
  | string
  | { name: string; icon?: string; color?: string };

export interface TechCategory {
  key: CategoryKey;
  /** "icon" pulls glyphs from devicon or local SVGs; "text" defaults to chip-only badges. */
  mode: RenderMode;
  /** True when icons are loaded from local SVGs in src/icons/ rather than devicon */
  localIcon?: boolean;
  technologies: readonly TechItem[];
}

export const techCategories: readonly TechCategory[] = [
  {
    key: "frontend",
    mode: "icon",
    localIcon: false,
    technologies: ["html5", "react", "vitejs", "css3", "tailwindcss", "svelte", "nextjs", "astro"],
  },
  {
    key: "backend",
    mode: "icon",
    localIcon: false,
    technologies: ["typescript", "javascript", "express", "nodejs", "python", "laravel", "php"],
  },
  {
    key: "databases",
    mode: "icon",
    localIcon: false,
    technologies: ["postgresql", "mysql", "mongodb", "oracle"],
  },
  {
    key: "designTools",
    mode: "icon",
    localIcon: false,
    technologies: ["figma"],
  },
  {
    key: "deployment",
    mode: "icon",
    localIcon: true,
    technologies: ["AWS-EC2", "AWS-S3", "Hostinger", "Netlify", "CPanel", "Render", "Vercel"],
  },
  {
    key: "aiMl",
    mode: "text",
    technologies: [
      { name: "Agno" },
      { name: "OpenAI GPT-4", icon: "simple-icons:openai", color: "#74AA9C" },
      // Anthropic's brand color is near-black — keep tonal/white so it reads.
      { name: "Anthropic Claude", icon: "simple-icons:anthropic" },
      { name: "Google Gemini", icon: "simple-icons:googlegemini", color: "#4285F4" },
      // YOLOv8 brand is deep navy — keep tonal/white.
      { name: "YOLOv8", icon: "simple-icons:yolo" },
      { name: "Multi-LLM workflows" },
    ],
  },
  {
    key: "integrations",
    mode: "text",
    technologies: [
      { name: "Front" },
      { name: "n8n", icon: "simple-icons:n8n", color: "#EA4B71" },
      { name: "Webhooks" },
      // GitHub mark is black — keep tonal/white.
      { name: "GitHub API", icon: "simple-icons:github" },
      { name: "REST" },
      { name: "GraphQL", icon: "simple-icons:graphql", color: "#E10098" },
      { name: "OAuth" },
      // JWT brand is black — keep tonal/white.
      { name: "JWT", icon: "simple-icons:jsonwebtokens" },
    ],
  },
  {
    key: "testing",
    mode: "text",
    technologies: [
      { name: "Cypress", icon: "simple-icons:cypress", color: "#69D3A7" },
      { name: "Percy", icon: "simple-icons:percy", color: "#9E66BF" },
      { name: "End-to-End Testing" },
      { name: "Visual Regression" },
      { name: "Automated CI Checks" },
    ],
  },
  {
    key: "observability",
    mode: "text",
    technologies: [
      // Sentry brand is dark purple — keep tonal/white.
      { name: "Sentry", icon: "simple-icons:sentry" },
      { name: "WebSockets" },
      { name: "Celery", icon: "simple-icons:celery", color: "#A9CC54" },
      { name: "Background workers" },
    ],
  },
  {
    key: "architecture",
    mode: "text",
    technologies: [
      // Django brand green is too dark — keep tonal/white.
      { name: "Django", icon: "simple-icons:django" },
      { name: "Cloudflare Workers", icon: "simple-icons:cloudflareworkers", color: "#F38020" },
      { name: "Cloudflare KV", icon: "simple-icons:cloudflare", color: "#F38020" },
      { name: "Argo CD", icon: "simple-icons:argo", color: "#EF7B4D" },
      { name: "GitHub Actions", icon: "simple-icons:githubactions", color: "#2088FF" },
      { name: "Docker", icon: "simple-icons:docker", color: "#2496ED" },
      { name: "Linux / SSH", icon: "simple-icons:linux", color: "#FCC624" },
      { name: "System Design" },
      { name: "Design Patterns" },
      { name: "Agile / Scrum" },
      { name: "Technical Documentation" },
    ],
  },
] as const;

export const totalTechnologyCount = techCategories.reduce(
  (sum, c) => sum + c.technologies.length,
  0,
);
