export class Recipe {
  name: string;
  link: string;
  tags: string[];
  fav: boolean;


  constructor(name: string, link: string, tags: string[], fav: boolean) {
    this.name = name;
    this.link = link;
    this.tags = tags;
    this.fav = fav;
  }
}
