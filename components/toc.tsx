'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/components/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TocProps {
  className?: string;
}

export function TableOfContents({ className }: TocProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract only h2 and h3 headings from the DOM
    const headings = Array.from(document.querySelectorAll('h2, h3'))
      .filter((heading) => heading.id) // Only headings with IDs
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1)),
      }));

    setToc(headings);

    // Set up intersection observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  if (toc.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-2', className)}>
      <p className="font-semibold text-sm text-muted-foreground mb-4">
        Table of Contents
      </p>
      <nav className="space-y-1">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={cn(
              'block w-full text-left text-sm py-1 px-2 rounded transition-colors',
              'hover:bg-muted hover:text-foreground',
              {
                'bg-muted text-foreground': activeId === item.id,
                'text-muted-foreground': activeId !== item.id,
                'pl-2 font-medium': item.level === 2, // h2 headings - main sections
                'pl-4 text-xs': item.level === 3, // h3 headings - subsections
              }
            )}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
} 