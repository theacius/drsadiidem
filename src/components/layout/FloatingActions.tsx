"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { telLink, waLink } from "@/lib/utils";

export function FloatingActions() {
  const t = useTranslations("floating");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="floating-actions fixed right-3 sm:right-6 bottom-[max(0.85rem,env(safe-area-inset-bottom))] sm:bottom-6 z-40 flex flex-col items-end gap-2.5 sm:gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t("scrollTop")}
            className="inline-flex items-center justify-center size-11 rounded-full bg-white text-[var(--color-ink-700)] border border-[var(--color-ink-100)] shadow-[var(--shadow-soft-lg)] hover:bg-[var(--color-cream-100)] hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowUp className="size-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <FAB
        href={telLink}
        label={t("callPhone")}
        icon={<Phone className="size-5" fill="currentColor" />}
        bg="bg-[var(--color-sky-500)]"
        ringClass="bg-[var(--color-sky-400)]"
        delay={0.1}
      />
      <FAB
        href={waLink(t("whatsAppPrefill"))}
        label={t("whatsApp")}
        icon={
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
          </svg>
        }
        bg="bg-[#25D366]"
        ringClass="bg-[#25D366]"
        delay={0.25}
      />
    </div>
  );
}

function FAB({
  href,
  label,
  icon,
  bg,
  ringClass,
  delay,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  bg: string;
  ringClass: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20, delay }}
      className="relative"
    >
      <span className={`pulse-ring absolute inset-0 rounded-full ${ringClass}`} aria-hidden />
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label={label}
        className={`relative inline-flex items-center justify-center size-12 sm:size-14 rounded-full ${bg} text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:scale-105 transition-transform`}
      >
        {icon}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-full bg-[var(--color-ink-900)] text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 hidden lg:block pointer-events-none">
          {label}
        </span>
      </a>
    </motion.div>
  );
}
