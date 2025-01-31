import { eleventyImageTransformPlugin, Image } from "@11ty/eleventy-img";

export default function (eleventyConfig) {

	eleventyConfig.addPlugin(eleventyImageTransformPlugin);
	eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));
	eleventyConfig.addPassthroughCopy('src/javascript/*')
	eleventyConfig.addPassthroughCopy('src/posts/*/*/images/*')

	function extractExcerpt(post) {
		if(!post.templateContent) return '';
		if(post.templateContent.indexOf('</p>') > 0) {
            const start = post.templateContent.indexOf('<p>');
			const end = post.templateContent.indexOf('</p>');
			return `${post.templateContent.substr(start, Math.min(end+4,100)).substr(0, ).trim()}${end > 100 ? "..." : ""}`;
		}
		return post.templateContent;
	}

	const dateFormatter = new Intl.DateTimeFormat("en-GB");
	eleventyConfig.addFilter("niceDate", function(d) {
		return dateFormatter.format(d);
	});

	// eleventyConfig.addLiquidShortcode("svgIcon", async filename => {
	// 	const metadata = await Image(`./src/_includes/icons/${filename}.svg`, {
	// 		formats: ["svg"],
	// 		dryRun: true,
	// 	});
	// 	return metadata.svg[0].buffer.toString();
	// })

	return {
		dir: {
			input: 'src'
		}
	}
}