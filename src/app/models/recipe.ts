export class Recipe {
  name: string;
  link: string;
  tags: string[];
  fav: boolean;
  details: string;


  constructor(name: string, link: string, tags: string[], fav: boolean) {
    this.name = name;
    this.link = link;
    this.tags = tags;
    this.fav = fav;
    this.details = "";
  }
}
