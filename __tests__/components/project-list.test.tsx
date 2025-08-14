import { render, screen } from '@testing-library/react';
import ProjectList from '@/components/project-list';

// Mock the projects data to include both V1 and V2
const mockProjects = [
  {
    title: 'Enduro Stats',
    description: 'EnduroStats is a fitness app that helps users track activities, set goals, and monitor progress with a sleek, responsive design. Currently undergoing a complete ground-up refactor with improved architecture.',
    imageSrc: '/strava3.png',
    altText: 'Enduro Stats project screenshot',
    technologies: [],
    status: 'Completed' as const,
    featured: false,
    liveLink: 'https://endurostats.vercel.app',
    githubRepo: 'https://github.com/karltiama/junestravaapp',
  },
  {
    title: 'Enduro Stats V2',
    description: 'A complete ground-up refactor of my fitness tracking app with improved architecture, advanced analytics, and professional development practices. Built with modern React patterns, proper data persistence, and enhanced user experience.',
    imageSrc: '/strava3.png',
    altText: 'Enduro Stats V2 project screenshot',
    technologies: [],
    liveLink: 'https://enduro-stats.vercel.app',
    githubRepo: 'https://github.com/karltiama/endurorevamp',
    status: 'Live' as const,
    featured: true,
  },
  {
    title: 'Reel Ratings',
    description: 'Reel Ratings is a movie rating app that allows users to rate and review movies.',
    imageSrc: '/reelratings.png',
    altText: 'Project 2',
    technologies: [],
    githubRepo: 'https://github.com/karltiama/movieapp',
    status: 'Completed' as const,
    featured: false,
  }
];

// Mock the projects import
jest.mock('@/content/projects/projectsData', () => ({
  projects: mockProjects,
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

describe('ProjectList', () => {
  it('renders all projects correctly', () => {
    render(<ProjectList />);
    
    // Check if all project titles are rendered
    expect(screen.getByText('Enduro Stats')).toBeInTheDocument();
    expect(screen.getByText('Enduro Stats V2')).toBeInTheDocument();
    expect(screen.getByText('Reel Ratings')).toBeInTheDocument();
  });

  it('displays project descriptions', () => {
    render(<ProjectList />);
    
    // Check if descriptions are visible
    expect(screen.getByText(/EnduroStats is a fitness app/)).toBeInTheDocument();
    expect(screen.getByText(/A complete ground-up refactor/)).toBeInTheDocument();
    expect(screen.getByText(/Reel Ratings is a movie rating app/)).toBeInTheDocument();
  });

  it('shows correct project statuses', () => {
    render(<ProjectList />);
    
    // Check if status badges are displayed
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('renders project links correctly', () => {
    render(<ProjectList />);
    
    // Check if live links are present
    const v1Link = screen.getByRole('link', { name: /Enduro Stats/ });
    const v2Link = screen.getByRole('link', { name: /Enduro Stats V2/ });
    
    expect(v1Link).toHaveAttribute('href', 'https://endurostats.vercel.app');
    expect(v2Link).toHaveAttribute('href', 'https://enduro-stats.vercel.app');
  });

  it('distinguishes between V1 and V2 projects', () => {
    render(<ProjectList />);
    
    // Verify that both versions are clearly labeled
    const v1Project = screen.getByText('Enduro Stats');
    const v2Project = screen.getByText('Enduro Stats V2');
    
    expect(v1Project).toBeInTheDocument();
    expect(v2Project).toBeInTheDocument();
    
    // Check that they have different descriptions
    expect(screen.getByText(/Currently undergoing a complete ground-up refactor/)).toBeInTheDocument();
    expect(screen.getByText(/A complete ground-up refactor/)).toBeInTheDocument();
  });
});
