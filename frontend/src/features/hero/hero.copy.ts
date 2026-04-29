/**
 * Splits "I'm Cristián, Full Stack Developer" / "Soy Cristián, Desarrollador Full Stack"
 * into three editorial fragments:
 *
 *   preface : "I'm"      / "Soy"
 *   name    : "Cristián" / "Cristián"
 *   role    : "Full Stack Developer" / "Desarrollador Full Stack"
 *
 * If the input does not match this shape, the splitter degrades gracefully
 * (everything goes into preface).
 */
export interface HeroTitleParts {
  preface: string;
  name: string;
  role: string;
}

export function splitHeroTitle(input: string): HeroTitleParts {
  const [leadRaw = "", roleRaw = ""] = input.split(",", 2);
  const leadTokens = leadRaw.trim().split(/\s+/);
  const role = roleRaw.trim();

  if (leadTokens.length < 2 || role.length === 0) {
    return { preface: leadRaw.trim(), name: "", role };
  }

  const name = leadTokens.pop() as string;
  const preface = leadTokens.join(" ");

  return { preface, name, role };
}
