export class MetaTagsController {
  setTitle(text: string) {
    document.title = text;
  }
  //later can add setMeta etc.
}
const metaTageController = new MetaTagsController();
export { metaTageController };
