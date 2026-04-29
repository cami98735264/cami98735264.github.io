/**
 * Lightweight IntersectionObserver fallback for `.reveal` elements.
 * Runs only when:
 *   - native scroll-driven `animation-timeline: view()` is unsupported, AND
 *   - user has not requested reduced motion
 * In modern browsers and reduced-motion contexts this is a no-op.
 */
export function initReveal(): void {
  if (typeof window === "undefined") return;

  const supportsScrollTimeline =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("animation-timeline: view()");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (supportsScrollTimeline || reducedMotion) {
    if (reducedMotion) {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((el) => el.classList.add("is-revealed"));
    }
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );

  document
    .querySelectorAll<HTMLElement>(".reveal")
    .forEach((el) => io.observe(el));
}
