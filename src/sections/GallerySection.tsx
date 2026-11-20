import {
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { ResilientImage } from '../components/ResilientImage';
import { SITE_CONTENT, type GalleryVideo } from '../data/content';
import { EASE_KSS, fadeUpBlur, staggerContainer, viewportOnce } from '../utils/animations';

type GalleryTab = 'photos' | 'videos';

export function GallerySection() {
  const [tab, setTab] = useState<GalleryTab>('photos');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);

  const photos = SITE_CONTENT.gallery.photos;

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    setZoomed(false);
  }, []);

  const showPrev = useCallback(() => {
    setZoomed(false);
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  const showNext = useCallback(() => {
    setZoomed(false);
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (selectedIndex === null && !activeVideo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
        setActiveVideo(null);
      } else if (selectedIndex !== null && e.key === 'ArrowLeft') {
        showPrev();
      } else if (selectedIndex !== null && e.key === 'ArrowRight') {
        showNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, activeVideo, closeLightbox, showPrev, showNext]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (zoomed) return;
    if (info.offset.x < -60) showNext();
    else if (info.offset.x > 60) showPrev();
  };

  const activePhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  return (
    <section
      id="gallery"
      className="relative bg-[#F4EEE3] py-20 sm:py-28 dark:bg-[#121147]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-[#1B1A5E]/15 pb-10 sm:flex-row sm:items-end sm:justify-between dark:border-[#FBF8F3]/15">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-2xl"
          >
            <div className="flex items-baseline gap-4">
              <span className="outline-numeral text-5xl sm:text-6xl font-bold" aria-hidden="true">
                {SITE_CONTENT.gallery.sectionNo}
              </span>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#D9650E] dark:text-[#FBA94C]">
                {SITE_CONTENT.gallery.kicker}
              </p>
            </div>
            <motion.h2
              variants={fadeUpBlur}
              className="mt-4 text-3xl font-bold tracking-[-0.025em] text-[#1B1A5E] sm:text-4xl lg:text-[2.85rem] lg:leading-[1.09] dark:text-[#FBF8F3]"
            >
              {SITE_CONTENT.gallery.title}
            </motion.h2>
            <motion.p
              variants={fadeUpBlur}
              className="mt-4 text-sm leading-relaxed text-[#1B1A5E]/72 sm:text-base dark:text-[#FBF8F3]/74"
            >
              {SITE_CONTENT.gallery.subtitle}
            </motion.p>
          </motion.div>

          {/* Segmented Gallery Tabs with layoutId */}
          <div
            role="tablist"
            aria-label="Gallery view selector"
            className="inline-flex shrink-0 rounded-xl border border-[#1B1A5E]/16 bg-[#FBF8F3] p-1.5 dark:border-[#FBF8F3]/16 dark:bg-[#0E0D3A]"
          >
            {(
              [
                { id: 'photos', label: 'Image Gallery' },
                { id: 'videos', label: 'Video Gallery' },
              ] as const
            ).map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setTab(item.id)}
                  className={`relative rounded-lg px-5 py-2 text-xs font-bold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] ${
                    active
                      ? 'text-[#FBF8F3] dark:text-[#0E0D3A]'
                      : 'text-[#1B1A5E]/70 hover:text-[#1B1A5E] dark:text-[#FBF8F3]/70 dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="gallery-tab-indicator"
                      transition={{ duration: 0.45, ease: EASE_KSS }}
                      className="absolute inset-0 rounded-lg bg-[#1B1A5E] dark:bg-[#F58220]"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {tab === 'photos' ? (
            <motion.div
              key="photos-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE_KSS }}
              className="mt-12 columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3"
            >
              {photos.map((photo, idx) => (
                <motion.button
                  key={photo.id}
                  layoutId={`gallery-card-${photo.id}`}
                  type="button"
                  data-cursor="view"
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative block w-full break-inside-avoid overflow-hidden rounded-[20px] border border-[#1B1A5E]/15 bg-[#EAE2D6] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] dark:border-[#FBF8F3]/15 dark:bg-[#0E0D3A] ${
                    photo.aspect === 'tall'
                      ? 'aspect-[3/4]'
                      : photo.aspect === 'wide'
                        ? 'aspect-[16/10]'
                        : 'aspect-[4/3]'
                  }`}
                >
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <ResilientImage
                      src={photo.src}
                      alt={photo.title}
                      fallbackTitle={photo.title}
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0D3A]/90 via-[#0E0D3A]/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-[#FBF8F3]">
                    <p className="text-[11px] font-semibold text-[#FBA94C]">
                      {photo.category} · {photo.location}
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-[#FBF8F3]">
                      {photo.title}
                    </h3>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="videos-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE_KSS }}
              className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {SITE_CONTENT.gallery.videos.map((video) => (
                <article
                  key={video.id}
                  className="group flex flex-col overflow-hidden rounded-[20px] border border-[#1B1A5E]/15 bg-[#FBF8F3] transition-colors hover:border-[#F58220] dark:border-[#FBF8F3]/15 dark:bg-[#0E0D3A]"
                >
                  <button
                    type="button"
                    data-cursor="view"
                    onClick={() => setActiveVideo(video)}
                    aria-label={`Play briefing: ${video.title}`}
                    className="relative aspect-[16/10] w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220]"
                  >
                    <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                      <ResilientImage
                        src={video.thumbnail}
                        alt={video.title}
                        fallbackTitle={video.title}
                      />
                    </div>
                    <div className="absolute inset-0 bg-[#0E0D3A]/45 transition-colors group-hover:bg-[#0E0D3A]/35" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F58220] text-[#0E0D3A] shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </span>
                    </div>
                    <span className="absolute bottom-3 right-3 rounded-lg bg-[#0E0D3A]/85 px-2.5 py-1 font-mono text-xs font-semibold text-[#FBF8F3] tabular-nums">
                      {video.duration}
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#D9650E] dark:text-[#FBA94C]">
                        {video.category}
                      </p>
                      <h3 className="mt-1.5 text-lg font-bold leading-snug text-[#1B1A5E] dark:text-[#FBF8F3]">
                        {video.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#1B1A5E]/72 dark:text-[#FBF8F3]/74">
                        {video.summary}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1B1A5E] transition-colors hover:text-[#D9650E] dark:text-[#FBA94C] dark:hover:text-white"
                    >
                      <span>Watch Operational Brief</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shared-Element Photo Lightbox */}
      <AnimatePresence>
        {activePhoto && selectedIndex !== null && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-[#0E0D3A]/95 p-4 sm:p-8 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="mb-4 flex w-full max-w-5xl items-center justify-between text-[#FBF8F3]"
            >
              <span className="font-mono text-xs text-[#FBA94C] tabular-nums">
                {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                {String(photos.length).padStart(2, '0')} · {activePhoto.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomed((z) => !z)}
                  aria-label={zoomed ? 'Zoom out image' : 'Zoom in image'}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FBF8F3]/18 bg-white/10 text-[#FBF8F3] transition-colors hover:bg-white/20"
                >
                  {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close gallery lightbox"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FBF8F3]/18 bg-white/10 text-[#FBF8F3] transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-5xl items-center justify-center"
            >
              <button
                type="button"
                onClick={showPrev}
                aria-label="Previous image"
                className="hidden sm:flex absolute left-0 z-20 h-12 w-12 items-center justify-center rounded-xl border border-[#FBF8F3]/18 bg-[#15144B]/85 text-[#FBF8F3] transition-colors hover:bg-[#F58220] hover:text-[#0E0D3A]"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <motion.div
                layoutId={`gallery-card-${activePhoto.id}`}
                drag={zoomed ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="relative max-h-[68vh] w-full max-w-3xl overflow-hidden rounded-[20px] border border-[#FBF8F3]/18 bg-[#0E0D3A] shadow-2xl"
              >
                <motion.img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  animate={{ scale: zoomed ? 1.55 : 1 }}
                  transition={{ duration: 0.45, ease: EASE_KSS }}
                  onClick={() => setZoomed((z) => !z)}
                  className="editorial-photo-grade max-h-[68vh] w-full cursor-zoom-in object-contain"
                />
              </motion.div>

              <button
                type="button"
                onClick={showNext}
                aria-label="Next image"
                className="hidden sm:flex absolute right-0 z-20 h-12 w-12 items-center justify-center rounded-xl border border-[#FBF8F3]/18 bg-[#15144B]/85 text-[#FBF8F3] transition-colors hover:bg-[#F58220] hover:text-[#0E0D3A]"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="mt-5 flex w-full max-w-3xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left"
            >
              <div>
                <h3 className="text-lg font-bold text-[#FBF8F3]">{activePhoto.title}</h3>
                <p className="mt-0.5 text-sm text-[#FBF8F3]/72">{activePhoto.caption}</p>
              </div>
              <div className="flex items-center gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous image"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FBF8F3]/18 bg-white/10 text-[#FBF8F3]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FBF8F3]/18 bg-white/10 text-[#FBF8F3]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Video Brief Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-[#0E0D3A]/88 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: EASE_KSS }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-[22px] border border-[#FBF8F3]/18 bg-[#0E0D3A] text-[#FBF8F3] shadow-2xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <ResilientImage
                  src={activeVideo.thumbnail}
                  alt={activeVideo.title}
                  fallbackTitle={activeVideo.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D3A] via-[#0E0D3A]/45 to-transparent" />
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close video briefing"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black/55 text-[#FBF8F3] hover:bg-black/80"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute inset-x-6 bottom-5">
                  <p className="text-xs font-bold text-[#FBA94C]">
                    {activeVideo.category} · {activeVideo.duration} Walkthrough Brief
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-[#FBF8F3] sm:text-2xl">
                    {activeVideo.title}
                  </h3>
                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/20">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 14, ease: 'linear' }}
                      className="h-full bg-[#F58220]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-sm leading-relaxed text-[#FBF8F3]/78">{activeVideo.summary}</p>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {activeVideo.keyTakeaways.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2 rounded-xl border border-[#FBF8F3]/12 bg-[#15144B]/70 p-3.5 text-xs leading-snug text-[#FBF8F3]/90"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#F58220]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
