/**
 * BookingCTA.jsx
 *
 * Conversion-focused CTA for drycleanmaster.in
 * Placed at the end of every blog post.
 */
import Link from "next/link";
export default function BookingCTA() {
  return (
    <section
      aria-label="Book a dry cleaning service"
      className="my-12 rounded-2xl overflow-hidden bg-gradient-to-br from-sky-500 via-sky-600 to-cyan-700"
    >
      <div className="px-7 py-10 sm:px-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-100 mb-1">
            Professional Dry Cleaning
          </p>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
            Need doorstep dry cleaning in Delhi NCR?
          </h2>
          <p className="text-sky-100 text-sm leading-relaxed max-w-lg">
            Expert sofa, carpet, and upholstery dry cleaning at your doorstep. Fast service, spotless results, affordable pricing.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <Link
            href="tel:+918882631413"
            className="inline-flex items-center justify-center gap-2 bg-white border border-sky-200 hover:border-sky-400 text-sky-700 font-semibold text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            📞 Call Now
          </Link>
          <Link
            href="https://wa.me/918882631413"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-200"
          >
            💬 WhatsApp
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-sky-700 hover:bg-sky-50 font-bold text-sm px-7 py-3 rounded-xl transition-all duration-200"
          >
            Book Now
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
