import { render, screen } from '@testing-library/react';
import { PostItem } from '@/components/post-item';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

describe('PostItem', () => {
  const mockProps = {
    slug: '/blog/test-post',
    title: 'Test Blog Post Title',
    description: 'This is a test description for the blog post.',
    date: '2024-01-15',
    tags: ['react', 'testing'],
  };

  it('renders all post information correctly', () => {
    render(<PostItem {...mockProps} />);
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Blog Post Title');
    expect(screen.getByText('This is a test description for the blog post.')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
    expect(screen.getByText('Read More →')).toBeInTheDocument();
  });

  it('handles long titles with proper mobile formatting', () => {
    const longTitleProps = {
      ...mockProps,
      title: 'This is a Very Long Blog Post Title That Should Break Properly on Mobile Devices Without Causing Horizontal Overflow Issues',
    };
    
    render(<PostItem {...longTitleProps} />);
    
    const titleLink = screen.getByRole('link', { name: /This is a Very Long Blog Post Title/ });
    expect(titleLink).toHaveClass('break-words', 'hyphens-auto', 'hover:text-primary', 'transition-colors');
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-lg', 'sm:text-xl', 'md:text-2xl', 'leading-tight');
  });

  it('renders without optional props', () => {
    const minimalProps = {
      slug: '/blog/minimal-post',
      title: 'Minimal Post',
      date: '2024-01-15',
    };
    
    render(<PostItem {...minimalProps} />);
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Minimal Post');
    expect(screen.queryByText('react')).not.toBeInTheDocument();
    expect(screen.queryByText('This is a test description')).not.toBeInTheDocument();
  });

  it('creates correct links', () => {
    render(<PostItem {...mockProps} />);
    
    const titleLink = screen.getByRole('link', { name: 'Test Blog Post Title' });
    expect(titleLink).toHaveAttribute('href', '/blog/test-post');
    
    const readMoreLink = screen.getByRole('link', { name: 'Read More →' });
    expect(readMoreLink).toHaveAttribute('href', '/blog/test-post');
  });

  it('renders responsive layout classes', () => {
    render(<PostItem {...mockProps} />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveClass('flex', 'flex-col', 'gap-3', 'py-4', 'px-2', 'sm:px-4');
  });
}); 