import { render, screen } from '@testing-library/react';
import { AnimatedSection } from '@/components/ui/animated-section';

// Mock framer-motion to avoid animation-related issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe('AnimatedSection', () => {
  it('renders children correctly', () => {
    render(
      <AnimatedSection>
        <div data-testid="test-content">Test Content</div>
      </AnimatedSection>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    render(
      <AnimatedSection className={customClass}>
        <div>Content</div>
      </AnimatedSection>
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveClass(customClass);
  });

  it('renders with default props', () => {
    render(
      <AnimatedSection>
        <div>Content</div>
      </AnimatedSection>
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toBeInTheDocument();
  });
});
