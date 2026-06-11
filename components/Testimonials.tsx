"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";

type Review = {
  id: string;
  authorName: string;
  authorUrl: string;
  photoUrl: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
  reviewUrl: string;
  avatarColor: string;
};

type GoogleReviewsResponse = {
  ok: boolean;
  rating: number | null;
  userRatingCount: number | null;
  googleMapsUrl: string;
  reviews: Omit<Review, "avatarColor">[];
};

const fallbackReviews: Review[] = [
  {
    id: "fallback-1",
    authorName: "Siddharth",
    authorUrl: "",
    photoUrl: "",
    rating: 5,
    text: "Our 7-seater fabric sofa had severe dust accumulation. The DryClean Master team cleaned it via their wet extraction process. It looks completely brand new!",
    relativeTime: "Google review",
    publishTime: "",
    reviewUrl: "",
    avatarColor: "bg-teal/25 text-teal",
  },
  {
    id: "fallback-2",
    authorName: "Pooja",
    authorUrl: "",
    photoUrl: "",
    rating: 5,
    text: "They managed to remove a tough coffee stain from my premium imported wool carpet. Highly impressed by their fabric shampoo treatment.",
    relativeTime: "Google review",
    publishTime: "",
    reviewUrl: "",
    avatarColor: "bg-copper/20 text-copper-dark",
  },
  {
    id: "fallback-3",
    authorName: "Rahul",
    authorUrl: "",
    photoUrl: "",
    rating: 5,
    text: "Very professional team. They inspected the fabric first and suggested dry cleaning for my velvet headboard instead of harsh wet washing. Exceptional knowledge!",
    relativeTime: "Google review",
    publishTime: "",
    reviewUrl: "",
    avatarColor: "bg-teal-mid/20 text-teal-light",
  },
];

const avatarColors = [
  "bg-teal/25 text-teal",
  "bg-copper/20 text-copper-dark",
  "bg-teal-mid/20 text-teal-light",
  "bg-slate-teal/40 text-ivory-warm",
  "bg-teal-light/20 text-teal-glow",
];

function getReviewInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "G";
}

function formatReviewCount(count: number | null) {
  if (!count) return "Google Reviews";
  return `${count.toLocaleString("en-IN")} Google Reviews`;
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [rating, setRating] = useState<number | null>(4.9);
  const [reviewCount, setReviewCount] = useState<number | null>(400);
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const prev = useCallback(
    () => setActive((a) => (a === 0 ? reviews.length - 1 : a - 1)),
    [reviews.length]
  );
  const next = useCallback(
    () => setActive((a) => (a === reviews.length - 1 ? 0 : a + 1)),
    [reviews.length]
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchGoogleReviews() {
      try {
        const response = await fetch("/api/google-reviews");
        const data = (await response.json()) as GoogleReviewsResponse;

        if (!isMounted || !data.ok || data.reviews.length === 0) return;

        setReviews(
          data.reviews.map((review, index) => ({
            ...review,
            avatarColor: avatarColors[index % avatarColors.length],
          }))
        );
        setRating(data.rating);
        setReviewCount(data.userRatingCount);
        setGoogleMapsUrl(data.googleMapsUrl);
        setActive(0);
      } catch {
        // Keep curated fallback reviews when Google Places is unavailable.
      }
    }

    fetchGoogleReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="bg-teal-deep py-20 md:py-28 teal-texture" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-14">
          {/* Google Rating badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 bg-white/6 border border-copper/20 px-4 py-2 rounded-full mb-5"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="text-copper-light fill-copper-light" />
              ))}
            </div>
            <span className="font-sans text-copper-light font-semibold text-xs">
              {rating?.toFixed(1) ?? "5.0"}
            </span>
            <span className="text-stone-teal/50 text-xs">·</span>
            <span className="font-sans text-stone-teal/60 text-xs">
              {formatReviewCount(reviewCount)}
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="flex items-center gap-2 mb-4 justify-center"
          >
            <span className="w-5 h-[2px] bg-teal-light rounded-full" />
            <span className="text-teal-light font-sans text-xs uppercase tracking-[0.2em] font-semibold">
              Client Reviews
            </span>
            <span className="w-5 h-[2px] bg-teal-light rounded-full" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-ivory-warm text-3xl md:text-4xl xl:text-5xl font-bold leading-[1.1]"
          >
            Trusted by Delhi&apos;s
            <br />
            <span className="italic font-normal text-stone-teal/45">
              Most Discerning Homes
            </span>
          </motion.h2>
        </div>

        {/* Review card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Large quote mark */}
          <span className="absolute -top-4 left-0 font-serif text-teal-light/6 text-[8rem] leading-none select-none pointer-events-none">
            &ldquo;
          </span>

          <div className="relative bg-teal/15 border border-teal/15 rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col justify-between backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.round(reviews[active].rating)
                          ? "text-copper-light fill-copper-light"
                          : "text-stone-teal/30"
                      }
                    />
                  ))}
                </div>

                {/* Quote text */}
                <blockquote className="font-serif text-ivory-warm text-xl md:text-2xl xl:text-[1.7rem] font-medium leading-snug mb-8 max-w-3xl">
                  &ldquo;{reviews[active].text}&rdquo;
                </blockquote>

                {/* Attribution with avatar */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${reviews[active].avatarColor}`}>
                      {getReviewInitial(reviews[active].authorName)}
                    </div>
                    <div>
                      {reviews[active].authorUrl ? (
                        <a
                          href={reviews[active].authorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-sans text-ivory-warm font-semibold text-sm hover:text-teal-glow transition-colors duration-200"
                        >
                          {reviews[active].authorName}
                        </a>
                      ) : (
                        <p className="font-sans text-ivory-warm font-semibold text-sm">
                          {reviews[active].authorName}
                        </p>
                      )}
                      <p className="font-sans text-stone-teal/50 text-xs mt-0.5">
                        {reviews[active].relativeTime || "Google review"}
                      </p>
                    </div>
                  </div>
                  <a
                    href={reviews[active].reviewUrl || googleMapsUrl || "#testimonials"}
                    target={reviews[active].reviewUrl || googleMapsUrl ? "_blank" : undefined}
                    rel={reviews[active].reviewUrl || googleMapsUrl ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 font-sans text-[11px] text-teal-glow/70 uppercase tracking-[0.12em] bg-teal/12 border border-teal/20 px-3 py-1 rounded-full hover:border-copper/40 hover:text-copper-light transition-colors duration-200"
                  >
                    Original Google Review
                    {(reviews[active].reviewUrl || googleMapsUrl) && <ExternalLink size={11} />}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2 items-center">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-copper" : "w-4 bg-stone-teal/30 hover:bg-stone-teal/60"
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-teal/20 flex items-center justify-center text-stone-teal/50 hover:border-copper/40 hover:text-copper transition-all duration-200"
                aria-label="Previous review"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-teal/20 flex items-center justify-center text-stone-teal/50 hover:border-copper/40 hover:text-copper transition-all duration-200"
                aria-label="Next review"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
