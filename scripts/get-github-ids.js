// Simple script to get GitHub repository and category IDs for Giscus
// Run this in your browser console on GitHub

console.log('=== GitHub Repository ID ===');
console.log('Go to: https://github.com/karltiama/nextjsblogapril');
console.log('The repository ID is in the HTML, or you can use the GitHub API');

console.log('\n=== GitHub Category ID ===');
console.log('Go to: https://github.com/karltiama/nextjsblogapril/discussions/categories');
console.log('Click on a category (or create "Announcements" if it doesn\'t exist)');
console.log('The category ID will be in the URL or you can inspect the page');

console.log('\n=== Alternative: Use GitHub API ===');
console.log('Visit: https://api.github.com/repos/karltiama/nextjsblogapril');
console.log('Look for "id" field for repository ID');
console.log('Visit: https://api.github.com/repos/karltiama/nextjsblogapril/discussions/categories');
console.log('Look for "id" field for category ID');
