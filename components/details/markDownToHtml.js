import { remark } from 'remark';
import html from 'remark-html';

// Function to convert the description and specifications markdown - from strapi - to html
const markDownToHtml = async (markdown) => {
 const result = await remark().use(html).process(markdown);
 return result.toString();
}

export default markDownToHtml;