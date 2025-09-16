'use client';

import { useEffect, useRef, useState } from 'react';
import Giscus from '@giscus/react';

interface CommentSectionProps {
	postSlug: string;
	postTitle: string;
}

export function CommentSection({ postSlug, postTitle }: CommentSectionProps) {
	const commentRef = useRef<HTMLDivElement>(null);
	const [giscusKey, setGiscusKey] = useState(0);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		// Scroll to comments when hash changes
		if (mounted && window.location.hash === '#comments') {
			commentRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [mounted]);

	// Force re-render of Giscus when post changes
	useEffect(() => {
		setGiscusKey(prev => prev + 1);
	}, [postSlug, postTitle]);

	return (
		<section ref={commentRef} id="comments" className="w-full border-t border-border pt-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h2 className="text-2xl font-bold mb-2">Comments</h2>
					<p className="text-muted-foreground">
						Have thoughts on this post? Join the discussion below!
					</p>
				</div>
				
				<Giscus
					key={giscusKey}
					id="comments"
					repo="karltiama/nextjsblogapril"
					repoId="784028516"
					category="Announcements"
					categoryId="45742932"
					mapping="specific"
					term={postSlug}
					strict="0"
					reactionsEnabled="1"
					emitMetadata="0"
					inputPosition="top"
					theme="preferred_color_scheme"
					lang="en"
					loading="lazy"
				/>
			</div>
		</section>
	);
}
