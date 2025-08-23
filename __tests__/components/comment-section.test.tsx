import { render, screen } from '@testing-library/react';
import { CommentSection } from '@/components/comment-section';

// Mock the Giscus component since it's a third-party component
jest.mock('@giscus/react', () => {
	return function MockGiscus() {
		return <div data-testid="giscus-comments">Giscus Comments</div>;
	};
});

describe('CommentSection', () => {
	const mockProps = {
		postSlug: '/blog/test-post',
		postTitle: 'Test Post Title'
	};

	it('renders the comments section with title', () => {
		render(<CommentSection {...mockProps} />);
		
		expect(screen.getByText('Comments')).toBeInTheDocument();
		expect(screen.getByText('Have thoughts on this post? Join the discussion below!')).toBeInTheDocument();
	});

	it('renders the Giscus component', () => {
		render(<CommentSection {...mockProps} />);
		
		expect(screen.getByTestId('giscus-comments')).toBeInTheDocument();
	});

	it('has the correct ID and ref', () => {
		render(<CommentSection {...mockProps} />);
		
		const commentsSection = screen.getByText('Comments').closest('div');
		expect(commentsSection).toHaveAttribute('id', 'comments');
	});

	it('applies correct styling classes', () => {
		render(<CommentSection {...mockProps} />);
		
		const commentsSection = screen.getByText('Comments').closest('div');
		expect(commentsSection).toHaveClass('mt-16', 'pt-8', 'border-t');
	});
});
