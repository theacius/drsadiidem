"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { FmSection } from "@/content/functional-medicine-reference";
import { FunctionalMedicineBlock } from "@/components/sections/functional-medicine/FunctionalMedicineBlocks";
import { cn } from "@/lib/utils";

type Props = {
  sections: FmSection[];
  initialSectionId?: string;
};

export function FunctionalMedicineTabs({ sections, initialSectionId }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const tabParam = searchParams.get("tab");

  const resolveId = useCallback(
    (id?: string | null) => {
      if (id && sections.some((s) => s.id === id)) return id;
      return sections[0]?.id ?? "nedir";
    },
    [sections],
  );

  const [activeId, setActiveId] = useState(() =>
    resolveId(tabParam ?? initialSectionId),
  );

  useEffect(() => {
    setActiveId(resolveId(tabParam ?? initialSectionId));
  }, [tabParam, initialSectionId, resolveId]);

  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  const selectSection = (id: string) => {
    setActiveId(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id === sections[0]?.id) params.delete("tab");
    else params.set("tab", id);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  if (!active) return null;

  return (
    <div className="fm-tabs-layout">
      <nav className="fm-tabs-nav" aria-label="Fonksiyonel tıp konuları">
        <ul className="fm-tabs-nav-list">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => selectSection(section.id)}
                  className={cn("fm-tabs-nav-btn tap-press", isActive && "is-active")}
                  aria-current={isActive ? "true" : undefined}
                >
                  {section.navLabel}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="fm-tabs-panel" key={active.id}>
        <h2 className="fm-tabs-panel-title">{active.title}</h2>
        <div className="fm-tabs-panel-body space-y-4">
          {active.blocks.map((block, i) => (
            <FunctionalMedicineBlock key={`${active.id}-${i}`} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
