import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {

	eleventyConfig.addPlugin(eleventyImageTransformPlugin);

	eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));

	eleventyConfig.addPassthroughCopy('src/javascript/*')
	eleventyConfig.addWatchTarget('src/javascript/*')
	eleventyConfig.addPassthroughCopy('src/styles/*')
	eleventyConfig.addWatchTarget('src/styles/*')
	eleventyConfig.addPassthroughCopy('src/posts/*/*/images/*')

	function extractExcerpt(post) {
		const maxCharacters = 200;
		if(!post.templateContent) return '';
		if(post.templateContent.indexOf('</p>') > 0) {
            const start = post.templateContent.indexOf('<p>');
			const end = post.templateContent.indexOf('</p>');
			return `${post.templateContent.substr(start, Math.min(end+4,maxCharacters)).trim()}${end > maxCharacters ? "..." : ""}`;
		}
		return post.templateContent;
	}

	const dateFormatter = new Intl.DateTimeFormat("en-GB");
	eleventyConfig.addFilter("niceDate", function(d) {
		return dateFormatter.format(d);
	});

	return {
		dir: {
			input: 'src'
		}
	}
}