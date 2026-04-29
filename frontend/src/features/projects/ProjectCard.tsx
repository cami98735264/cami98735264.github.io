import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ShowMore } from "@re-dev/react-truncate";
import { detectBackdropTone } from "@lib/image-tone";
import "./ProjectCard.css";

interface Props {
  index: number;
  title: string;
  description: string;
  projectId: number;
  image: string;
  viewText: string;
  showMoreText: string;
  showLessText: string;
  locale: string;
}

export default function ProjectCard({
  index,
  title,
  description,
  projectId,
  image,
  viewText,
  showMoreText,
  showLessText,
  locale,
}: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [mediaTone, setMediaTone] = useState<"light" | "dark" | null>(null);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const href = `${base}/${locale}/projects/${projectId}/`;
  const num = String(index + 1).padStart(2, "0");

  useEffect(() => {
    let cancelled = false;
    detectBackdropTone(image).then((tone) => {
      if (cancelled || tone === null) return;
      setMediaTone(tone);
    });
    return () => {
      cancelled = true;
    };
  }, [image]);

  const mediaStyle: CSSProperties | undefined =
    mediaTone === "light"
      ? ({ "--card-media-bg": "var(--color-paper)" } as CSSProperties)
      : undefined;

  return (
    <article ref={cardRef} className="project-card reveal">
      <div className="project-card__num eyebrow" aria-hidden="true">
        {num}
      </div>

      <a
        href={href}
        className="project-card__media"
        data-tone={mediaTone ?? "unknown"}
        style={mediaStyle}
        aria-label={`${viewText}: ${title}`}
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="project-card__image"
        />
      </a>

      <div className="project-card__body">
        <h3 className="project-card__title display">
          <a href={href}>{title}</a>
        </h3>

        <div className={`project-card__desc${expanded ? " is-expanded" : ""}`}>
          <ShowMore
            lines={3}
            more={
              <span className="project-card__toggle">
                {showMoreText}
              </span>
            }
            less={
              <span className="project-card__toggle">
                {showLessText}
              </span>
            }
            anchorClass="project-card__toggle-anchor"
            onChange={(isExpanded: boolean) => setExpanded(isExpanded)}
          >
            {description}
          </ShowMore>
        </div>

        <a href={href} className="project-card__cta" aria-label={`${viewText}: ${title}`}>
          <span>{viewText}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}
