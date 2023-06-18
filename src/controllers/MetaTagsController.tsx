export class MetaTagsController {
  setTitle(text: string) {
    document.title = text;
  }
  //later can add setMeta etc.
}
const metaTagsController = new MetaTagsController();
export { metaTagsController };
