import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { BilingualString } from '../types/atlas';

interface BilingualTextProps {
  text: BilingualString;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3';
  primaryClassName?: string;
  secondaryClassName?: string;
  className?: string;
  forceStacked?: boolean;
  inlineSeparator?: boolean;
}

export function BilingualText({
  text,
  as = 'div',
  primaryClassName = '',
  secondaryClassName = 'text-sm text-[#57514A] dark:text-[#A8A095] italic',
  className = '',
  forceStacked = false,
  inlineSeparator = false,
}: BilingualTextProps) {
  const { showFrench, dualLayout } = useLanguage();

  if (inlineSeparator) {
    return (
      <span className={className}>
        <span className={primaryClassName}>{text.tr}</span>
        {showFrench && (
          <>
            <span aria-hidden="true" className="mx-1.5 opacity-45">
              ·
            </span>
            <span lang="fr" className={secondaryClassName}>
              {text.fr}
            </span>
          </>
        )}
      </span>
    );
  }

  const isSideBySide = !forceStacked && dualLayout === 'side-by-side' && showFrench;

  if (isSideBySide) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 items-baseline ${className}`}>
        <div className={primaryClassName}>{text.tr}</div>
        <div
          lang="fr"
          className={`md:pl-5 md:border-l md:border-[#E7E0D4] dark:md:border-[#2C2824] ${secondaryClassName}`}
        >
          {text.fr}
        </div>
      </div>
    );
  }

  const Tag = as;

  if (as === 'span') {
    return (
      <span className={`inline-flex flex-col ${className}`}>
        <span className={primaryClassName}>{text.tr}</span>
        {showFrench && (
          <span lang="fr" className={secondaryClassName}>
            {text.fr}
          </span>
        )}
      </span>
    );
  }

  return (
    <div className={`space-y-1 ${className}`}>
      <Tag className={primaryClassName}>{text.tr}</Tag>
      {showFrench && (
        <p lang="fr" className={secondaryClassName}>
          {text.fr}
        </p>
      )}
    </div>
  );
}
