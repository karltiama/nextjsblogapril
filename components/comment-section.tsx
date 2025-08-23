'use client';

import { useEffect, useRef } from 'react';
import Giscus from '@giscus/react';

interface CommentSectionProps {
	postSlug: string;
	postTitle: string;
}

export function CommentSection({ postSlug, postTitle }: CommentSectionProps) {
	const commentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Scroll to comments when hash changes
		if (window.location.hash === '#comments') {
			commentRef.current?.scrollIntoView({ behavior: 'smooth' });
		}
	}, []);

	return (
		<div ref={commentRef} id="comments" className="mt-16 pt-8 border-t">
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-2">Comments</h2>
				<p className="text-muted-foreground">
					Have thoughts on this post? Join the discussion below!
				</p>
			</div>
			
			<Giscus
				id="comments"
				repo="karltiama/nextjsblogapril"
				repoId="784028516"
				category="Announcements"
				categoryId="45742932"
				mapping="pathname"
				strict="0"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="top"
				theme="preferred_color_scheme"
				lang="en"
				loading="lazy"
			/>
		</div>
	);
}
