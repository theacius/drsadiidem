import { buildAppearanceCssVars, loadSiteAppearance } from "@/lib/site-appearance";

/** Sunucuda tema renkleri ve üst şerit gradyanını enjekte eder. */
export async function ThemeStyle() {
  const appearance = await loadSiteAppearance();
  const vars = buildAppearanceCssVars(appearance);
  const css = `:root{${vars}}.header-top-bar{background:linear-gradient(105deg,var(--site-header-topbar-1) 0%,var(--site-header-topbar-2) 42%,var(--site-header-topbar-3) 100%) !important;}`;
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style id="site-appearance-vars" dangerouslySetInnerHTML={{ __html: css }} />
      {appearance.faviconUrl ? (
        <link rel="icon" href={appearance.faviconUrl} sizes="any" />
      ) : null}
    </>
  );
}
