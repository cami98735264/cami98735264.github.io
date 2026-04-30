import { loadTranslations } from "@i18n/index";

export async function getProjectStaticPaths() {
  const t = await loadTranslations("es");
  return t.sections.projects.list.map((p) => ({
    params: { projectid: String(p.id) },
  }));
}
