import { render, screen } from '@testing-library/react';

// Mock the entire projects data to avoid dependency issues
const mockProjects = [
  {
    title: 'Enduro Stats',
    description: 'A fitness tracking app',
    imageSrc: '/test.png',
    altText: 'Test alt',
    technologies: [],
    status: 'Live' as const,
    featured: true,
    relatedBlogPosts: [
      {
        title: 'Strava API Integration',
        slug: 'strava-api',
        description: 'Learn how I integrated the Strava API'
      },
      {
        title: 'Enduro Stats Refactor',
        slug: 'enduro-refactor',
        description: 'The complete refactor of my fitness tracking app'
      }
    ]
  },
  {
    title: 'Reel Ratings',
    description: 'A movie rating app',
    imageSrc: '/test2.png',
    altText: 'Test alt 2',
    technologies: [],
    status: 'Completed' as const,
    featured: false,
  }
];

// Mock the projects import
jest.mock('@/content/projects/projectsData', () => ({
  projects: mockProjects,
}));

// Import after mocking to avoid issues
import ProjectPage from '@/app/projects/[projectName]/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('ProjectPage', () => {
  it('renders project details correctly', () => {
    const mockProject = mockProjects.find((p: any) => p.title === 'Enduro Stats');
    if (!mockProject) {
      throw new Error('Test project not found');
    }

    const params = { projectName: 'enduro-stats' };
    render(<ProjectPage params={params} />);

    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
  });

  it('renders related blog posts when they exist', () => {
    const params = { projectName: 'enduro-stats' };
    render(<ProjectPage params={params} />);

    // Check if related blog posts section exists
    expect(screen.getByText('Related Blog Posts:')).toBeInTheDocument();
    
    // Check if blog post links are rendered
    expect(screen.getByText('Strava API Integration')).toBeInTheDocument();
    expect(screen.getByText('Enduro Stats Refactor')).toBeInTheDocument();
    
    // Check if links have correct href
    const stravaLink = screen.getByRole('link', { name: /Strava API Integration/ });
    expect(stravaLink).toHaveAttribute('href', '/blog/strava-api');
  });

  it('does not render related blog posts section when no related posts exist', () => {
    const params = { projectName: 'reel-ratings' };
    render(<ProjectPage params={params} />);

    // Check that related blog posts section is not rendered
    expect(screen.queryByText('Related Blog Posts:')).not.toBeInTheDocument();
  });
}); 