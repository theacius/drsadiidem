import type { FmBlock } from "@/content/functional-medicine-reference";

export function FunctionalMedicineBlock({ block }: { block: FmBlock }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="text-[15px] sm:text-base leading-[1.75] text-[var(--color-ink-700)] text-pretty">
          {block.text}
        </p>
      );
    case "h3":
      return (
        <h3 className="font-display text-lg sm:text-xl font-semibold text-[var(--color-ink-900)] mt-6 mb-2">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="mt-3 space-y-2 text-[15px] leading-[1.65] text-[var(--color-ink-700)] list-disc pl-5">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "checks":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-[15px] leading-[1.65] text-[var(--color-ink-800)]"
            >
              <span className="text-[var(--color-primary)] font-bold shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-4 w-full max-w-full overflow-x-auto rounded-lg border border-[var(--color-ink-100)]">
          <table className="fm-ref-table w-full min-w-[28rem] text-left text-sm">
            <thead>
              <tr className="bg-[var(--color-cream-50)]">
                <th className="px-4 py-3 font-semibold text-[var(--color-ink-900)]">
                  {block.headers[0]}
                </th>
                <th className="px-4 py-3 font-semibold text-[var(--color-ink-900)]">
                  {block.headers[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-[var(--color-ink-100)]">
                  <td className="px-4 py-3 text-[var(--color-ink-700)] align-top">{row[0]}</td>
                  <td className="px-4 py-3 text-[var(--color-ink-700)] align-top">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}
