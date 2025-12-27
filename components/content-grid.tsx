'use client'
import { motion, type Variants, type Transition } from 'motion/react'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'

// Clean fade-in animation for individual items
const ITEM_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const ITEM_TRANSITION = {
  duration: 0.35,
  ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easeOut
}

type ContentItem = {
  semester?: string;
  name: string;
  description: string;
  link: string;
  video?: string;
  image?: string;
  pdfUrl?: string;
  gradientColors?: [string, string, string, string];
  id: string;
}

type ProjectVideoProps = {
  src: string
  enablePreview?: boolean
}

function ProjectVideo({ src, enablePreview = true }: ProjectVideoProps) {
  if (!enablePreview) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        className="aspect-video w-full rounded-2xl"
      />
    )
  }

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <video
          src={src}
          autoPlay
          loop
          muted
          className="aspect-video w-full cursor-zoom-in rounded-2xl"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          <video
            src={src}
            autoPlay
            loop
            muted
            className="aspect-video h-[50vh] w-full rounded-2xl md:h-[70vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

type ProjectImageProps = {
  src: string
  alt: string
  enablePreview?: boolean
}

function ProjectImage({ src, alt, enablePreview = true }: ProjectImageProps) {
  if (!enablePreview) {
    return (
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        className="aspect-video w-full rounded-2xl object-cover"
      />
    )
  }

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <Image
          src={src}
          alt={alt}
          width={800}
          height={450}
          className="aspect-video w-full cursor-zoom-in rounded-2xl object-cover"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 max-w-4xl max-h-[90vh]">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full h-auto rounded-2xl max-h-[85vh] object-contain"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

type PdfPreviewProps = {
  pdfUrl: string
  title: string
  gradientColors?: [string, string, string, string]
  enablePreview?: boolean
}

function PdfPreview({ pdfUrl, title, gradientColors, enablePreview = true }: PdfPreviewProps) {
  const gradientStyle = gradientColors 
    ? {
        background: `radial-gradient(circle at 20% 50%, ${gradientColors[0]} 0%, transparent 50%), 
                     radial-gradient(circle at 80% 20%, ${gradientColors[1]} 0%, transparent 50%), 
                     radial-gradient(circle at 40% 80%, ${gradientColors[2]} 0%, transparent 50%), 
                     radial-gradient(circle at 60% 30%, ${gradientColors[3]} 0%, transparent 50%), 
                     linear-gradient(135deg, ${gradientColors[0]}20, ${gradientColors[3]}20)`,
        filter: 'blur(40px)',
      }
    : {};

  const content = (
    <div 
      className="aspect-video w-full rounded-2xl relative overflow-hidden"
      style={gradientColors ? {} : { backgroundColor: '#f3f4f6' }}
    >
      {gradientColors ? (
        <>
          <div 
            className="absolute inset-0 opacity-60"
            style={gradientStyle}
          />
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: `linear-gradient(45deg, ${gradientColors[0]}40, ${gradientColors[1]}40, ${gradientColors[2]}40, ${gradientColors[3]}40)`,
              filter: 'blur(20px)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        </>
      ) : null}
    </div>
  );

  if (!enablePreview) {
    return (
      <a
        href={pdfUrl}
        download={`${title}.pdf`}
        className="block cursor-pointer hover:opacity-80 transition-opacity"
        title={`Download ${title}`}
      >
        {content}
      </a>
    );
  }

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger>
        <div className={enablePreview ? "cursor-zoom-in" : ""}>
          {content}
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50 w-[90vw] h-[90vh] max-w-6xl">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&page=1&view=FitH`}
            className="w-full h-full rounded-2xl"
            title={title}
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

type ContentGridProps = {
  title: string;
  items: ContentItem[];
  enablePreview?: boolean;
  variants?: Variants;
  transition?: Transition;
}

export function ContentGrid({ title, items, enablePreview = true, variants, transition }: ContentGridProps) {
  // Group course notes by semester for visual separation
  const groupedItems = title === "Course Notes" 
    ? items.reduce((acc, item) => {
        const semester = item.semester || 'Other';
        if (!acc[semester]) acc[semester] = [];
        acc[semester].push(item);
        return acc;
      }, {} as Record<string, ContentItem[]>)
    : null;

  // Container variants for staggered children
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <motion.section
      variants={variants}
      transition={transition}
    >
      <h3 className="mb-5 text-lg font-medium">{title}</h3>
      
      {groupedItems ? (
        // Render course notes grouped by semester
        <div className="space-y-8">
          {Object.entries(groupedItems)
            .sort(([a], [b]) => b.localeCompare(a)) // Sort semesters DESC (BA4, BA3, BA2)
            .map(([semester, semesterItems], semesterIndex) => (
              <motion.div 
                key={semester} 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: semesterIndex * 0.08,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <div className="flex items-center gap-3">
                  <h4 className="text-base font-medium text-zinc-700 dark:text-zinc-300">{semester}</h4>
                  <div className="flex-1 h-px bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-700" />
                </div>
                <motion.div 
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {semesterItems.map((item) => (
                    <motion.div 
                      key={item.id} 
                      className="space-y-2"
                      variants={ITEM_VARIANTS}
                      transition={ITEM_TRANSITION}
                    >
                      <div className="relative rounded-2xl bg-zinc-50/40 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                        {item.video ? (
                          <ProjectVideo src={item.video} enablePreview={enablePreview} />
                        ) : item.image ? (
                          <ProjectImage src={item.image} alt={item.name} enablePreview={enablePreview} />
                        ) : item.pdfUrl ? (
                          <PdfPreview 
                            pdfUrl={item.pdfUrl} 
                            title={item.name} 
                            gradientColors={item.gradientColors}
                            enablePreview={enablePreview}
                          />
                        ) : null}
                      </div>
                      <div className="px-1">
                        <div className="flex items-center gap-2 mb-1">
                          <a
                            className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {item.name}
                            <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full" />
                          </a>
                          {item.semester && (
                            <span className="bg-zinc-100 dark:bg-zinc-800 rounded-full px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                              {item.semester}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-base text-zinc-600 dark:text-zinc-400">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
        </div>
      ) : (
        // Render regular grid for non-course notes
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item) => (
            <motion.div 
              key={item.id} 
              className="space-y-2"
              variants={ITEM_VARIANTS}
              transition={ITEM_TRANSITION}
            >
              <div className="relative rounded-2xl bg-zinc-50/40 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                {item.video ? (
                  <ProjectVideo src={item.video} enablePreview={enablePreview} />
                ) : item.image ? (
                  <ProjectImage src={item.image} alt={item.name} enablePreview={enablePreview} />
                ) : item.pdfUrl ? (
                  <PdfPreview 
                    pdfUrl={item.pdfUrl} 
                    title={item.name} 
                    gradientColors={item.gradientColors}
                    enablePreview={enablePreview}
                  />
                ) : null}
              </div>
              <div className="px-1">
                <div className="flex items-center gap-2 mb-1">
                  <a
                    className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                    <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full" />
                  </a>
                  {item.semester && (
                    <span className="bg-zinc-100 dark:bg-zinc-800 rounded-full px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      {item.semester}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  )
} 