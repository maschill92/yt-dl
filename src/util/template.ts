import * as ejs from "ejs";

/**
 * Render a ejs template string using $ as the delimiter.
 *
 * @param template an ejs template string
 * @param data context object for rendering data
 * @returns a rendered string
 * @example
 * render(`Hello, <$= name $>!`, { name: 'world' }); // "Hello, world!"
 */
export function renderTemplate(
  template: string,
  data: {
    [name: string]: any;
  }
): string {
  return ejs.render(template, data, {
    delimiter: "$",
  });
}
