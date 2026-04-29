/**
 * Detect whether a remote image needs a light or dark backdrop behind it.
 *
 * Strategy: load the image with CORS, draw it scaled to a 32×32 canvas,
 * then compute two alpha-weighted brightness stats — perimeter (the
 * outermost ring of pixels, which usually reveals the image's own
 * background) and full-image (every pixel). Combine them so the result
 * leans toward "swap to light" whenever the visible backdrop is dark.
 *
 * Returns Rec. 601 luma in [0..1], or `null` if the image is
 * CORS-tainted, fails to load, or has no visible content.
 */

interface SampleStats {
  brightness: number;
  alphaCoverage: number;
}

function statsFromPixels(
  data: Uint8ClampedArray,
  indices: number[],
): SampleStats | null {
  if (indices.length === 0) return null;
  let r = 0;
  let g = 0;
  let b = 0;
  let totalAlpha = 0;
  let opaqueCount = 0;
  for (const i of indices) {
    const a = data[i + 3] / 255;
    r += data[i] * a;
    g += data[i + 1] * a;
    b += data[i + 2] * a;
    totalAlpha += a;
    if (a > 0.05) opaqueCount++;
  }
  if (totalAlpha < 0.5) return null;
  r /= totalAlpha;
  g /= totalAlpha;
  b /= totalAlpha;
  return {
    brightness: (0.299 * r + 0.587 * g + 0.114 * b) / 255,
    alphaCoverage: opaqueCount / indices.length,
  };
}

export function analyzeBackdropBrightness(src: string): Promise<number | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !src) return resolve(null);

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const size = 32;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const idx = (x: number, y: number) => (y * size + x) * 4;

        const perimIndices: number[] = [];
        for (let x = 0; x < size; x++) {
          perimIndices.push(idx(x, 0));
          perimIndices.push(idx(x, size - 1));
        }
        for (let y = 1; y < size - 1; y++) {
          perimIndices.push(idx(0, y));
          perimIndices.push(idx(size - 1, y));
        }

        const fullIndices: number[] = [];
        for (let i = 0; i < data.length; i += 4) fullIndices.push(i);

        const perim = statsFromPixels(data, perimIndices);
        const full = statsFromPixels(data, fullIndices);

        if (!full || full.alphaCoverage < 0.05) return resolve(null);

        if (!perim || perim.alphaCoverage < 0.3) {
          return resolve(full.brightness);
        }

        resolve(Math.min(perim.brightness, full.brightness));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Convenience: returns "light" | "dark" | null directly.
 */
export async function detectBackdropTone(
  src: string,
  threshold = 0.5,
): Promise<"light" | "dark" | null> {
  const b = await analyzeBackdropBrightness(src);
  if (b === null) return null;
  return b < threshold ? "light" : "dark";
}
