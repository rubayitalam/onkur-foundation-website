import DOMPurify from "isomorphic-dompurify";

/**
 * Checks if a string contains HTML tags.
 */
export function isHtml(str: string): boolean {
  if (!str) return false;
  return /<\/?[a-z][\s\S]*>/i.test(str);
}

/**
 * Prepares content for the rich text editor.
 * If the content is plain text (backward compatibility for existing posts),
 * converts newlines to HTML paragraphs.
 */
export function toEditorHtml(content: string): string {
  if (!content) return "";
  if (isHtml(content)) return content;

  // Convert plain text with single/double newlines into paragraphs
  return content
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => {
      const clean = paragraph.replace(/\n/g, "<br />").trim();
      return clean ? `<p>${clean}</p>` : "";
    })
    .filter(Boolean)
    .join("");
}

/**
 * Sanitizes HTML using isomorphic-dompurify before rendering with dangerouslySetInnerHTML.
 * Strips script tags, event handlers, and javascript: URIs while preserving formatting styles.
 */
export function sanitizeBlogHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "b",
      "i",
      "em",
      "strong",
      "u",
      "s",
      "strike",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "span",
      "div",
      "blockquote",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "code",
      "pre",
      "sub",
      "sup",
    ],
    ALLOWED_ATTR: [
      "href",
      "target",
      "rel",
      "title",
      "class",
      "style",
      "align",
    ],
    ALLOWED_URI_REGEXP:
      /^(?:(?:(?:f|ht)tps?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_ATTR: ["target"],
  });
}

