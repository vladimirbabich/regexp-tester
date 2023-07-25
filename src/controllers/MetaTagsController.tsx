export class MetaTagsController {
  setTitle(text: string) {
    document.title = text;
  }
  setMeta(name: string = '', content: string = '') {
    const element = document.querySelector(`meta[name="${name}"]`);
    if (element) element.setAttribute('content', content);
  }
  setDefault() {
    document.title = 'Regular Expressions Tester';
    const descElement = document.querySelector(`meta[name="description"]`);
    if (descElement)
      descElement.setAttribute(
        'content',
        'Test your knowledge of regular expressions. Answer as many questions as you can to be at the top!'
      );
    const keysElement = document.querySelector(`meta[name="description"]`);
    if (keysElement)
      keysElement.setAttribute(
        'content',
        'regex test, test regex, Regular expressions, regexp, Regex, Pattern matching, String manipulation, Text processing, Search algorithms, Parsing, Syntax, Testing.'
      );
  }

  //later can add setMeta etc.
}
const metaTagsController = new MetaTagsController();
export { metaTagsController };
