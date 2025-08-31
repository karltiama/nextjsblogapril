import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { posts } from '#site/content';

// Mock the content module
jest.mock('#site/content', () => ({
  posts: [
    {
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test description',
      date: '2024-01-01',
      tags: ['test'],
      published: true,
    },
  ],
}));

// Mock the ProjectList component
jest.mock('@/components/project-list', () => {
  return function MockProjectList() {
    return <div data-testid="project-list">Project List</div>;
  };
});

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

describe('Home Page', () => {
  it('renders the main heading "Hi, I\'m Karl"', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hi, I'm Karl");
  });



  it('renders the blog section with latest posts', () => {
    render(<Home />);
    
    expect(screen.getByText('Rebuild your mental model')).toBeInTheDocument();
    expect(screen.getByText('Test Post')).toBeInTheDocument();
  });

  it('renders the projects section', () => {
    render(<Home />);
    
    expect(screen.getByText('My Projects')).toBeInTheDocument();
    expect(screen.getByTestId('project-list')).toBeInTheDocument();
  });

  it('displays navigation buttons', () => {
    render(<Home />);
    
    expect(screen.getByText('View My Projects')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });
});
