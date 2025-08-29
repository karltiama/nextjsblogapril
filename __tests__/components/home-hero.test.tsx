import { render, screen } from '@testing-library/react';
import { HomeHero } from '@/components/home-hero';

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
    p: ({ children, className, ...props }: any) => (
      <p className={className} data-testid="motion-p" {...props}>
        {children}
      </p>
    ),
    section: ({ children, className, ...props }: any) => (
      <section className={className} data-testid="motion-section" {...props}>
        {children}
      </section>
    ),
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock the AnimatedTechStack component
jest.mock('@/components/ui/animated-tech-stack', () => ({
  AnimatedTechStack: ({ techs }: { techs: string[] }) => (
    <div data-testid="animated-tech-stack">
      {techs.map((tech) => (
        <span key={tech} data-testid={`tech-${tech}`}>
          {tech}
        </span>
      ))}
    </div>
  ),
}));

describe('HomeHero', () => {
  it('renders the main heading correctly', () => {
    render(<HomeHero />);
    
    expect(screen.getByText("Hi, I'm Karl")).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Developer')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<HomeHero />);
    
    expect(screen.getByText(/I specialize in the React ecosystem/)).toBeInTheDocument();
  });

  it('renders all navigation buttons', () => {
    render(<HomeHero />);
    
    expect(screen.getByText('View My Projects')).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders the tech stack component', () => {
    render(<HomeHero />);
    
    expect(screen.getByTestId('animated-tech-stack')).toBeInTheDocument();
  });

  it('renders the coffee illustration', () => {
    render(<HomeHero />);
    
    expect(screen.getByAltText('Illustration of a person drinking coffee')).toBeInTheDocument();
  });

  it('renders side column images on larger screens', () => {
    render(<HomeHero />);
    
    expect(screen.getByAltText('Illustration of a person programming')).toBeInTheDocument();
    expect(screen.getByAltText('Illustration of a person building a website')).toBeInTheDocument();
  });
});
