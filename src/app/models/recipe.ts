export class Recipe {
  name: string;
  link: string;
  tags: string[];
  fav: boolean;
  details: string;
  url_image: string;


  constructor(name: string, link: string, tags: string[], fav: boolean, url_image: string) {
    this.name = name;
    this.link = link;
    this.tags = tags;
    this.fav = fav;
    this.details = "";
    this.url_image = url_image;
  }
}
