import { Fruit } from "./someModel";

class Suite implements Fruit{
  parentTree: number[][];
  energy: number;
  constructor(private howmuch: Date[]){}
  grab(): this{return this}
}

const thing = new Suite([])
console.log(thing as any);
