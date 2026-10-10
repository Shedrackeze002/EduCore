import { memo, useMemo } from 'react';
import { renderMarkdown, renderMath } from '@/lib/markdown.ts';
import { cn } from '@/lib/cn.ts';

/** Markdown with $math$. Use `inline` for short labels (no paragraphs). */
export const Markdown = memo(function Markdown({ md, inline, className, sanitize }: { md: string; inline?: boolean; className?: string; sanitize?: boolean }) {
  const html = useMemo(() => renderMarkdown(md ?? '', { inline, sanitize }), [md, inline, sanitize]);
  if (inline) return <span className={cn('prose-inline', className)} dangerouslySetInnerHTML={{ __html: html }} />;
  return <div className={cn('prose-edu', className)} dangerouslySetInnerHTML={{ __html: html }} />;
});

export function Tex({ tex, display, className }: { tex: string; display?: boolean; className?: string }) {
  const html = useMemo(() => renderMath(tex, display), [tex, display]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
