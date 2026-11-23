import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

const mediaModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/media/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

const mediaByPath = new Map<string, ImageMetadata>();
for (const [key, mod] of Object.entries(mediaModules)) {
  const filename = key.split('/').pop();
  if (filename && mod?.default) {
    mediaByPath.set(`/${filename}`, mod.default);
    mediaByPath.set(filename, mod.default);
  }
}

export function resolveMedia(src?: string | null): ImageMetadata | null {
  if (!src) return null;
  if (/^https?:\/\//i.test(src)) return null;
  const clean = src.split('?')[0].normalize('NFC');
  return mediaByPath.get(clean) ?? mediaByPath.get(clean.replace(/^\//, '')) ?? null;
}

export async function optimizeMediaUrl(
  src?: string | null,
  width = 1600,
  quality = 82,
): Promise<string> {
  if (!src) return '';
  const meta = resolveMedia(src);
  if (!meta) return src;
  const out = await getImage({
    src: meta,
    width: Math.min(width, meta.width),
    format: 'webp',
    quality,
  });
  return out.src;
}
