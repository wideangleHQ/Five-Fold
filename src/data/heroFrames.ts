// 60-frame cinematic solar installation sequence URLs (served from /public/hero-animation)
export const HERO_FRAME_SOURCES: string[] = Array.from({ length: 60 }, (_, i) => {
  const paddedIndex = String(i).padStart(3, "0");
  return `/hero-animation/Solar Installation Cinematic Reveal_${paddedIndex}.jpg`;
});
