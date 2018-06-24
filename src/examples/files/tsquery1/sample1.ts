class Animal {
  constructor(public name: string) { }
  move(distanceInMeters: number = 0) {
    console.log( `${this.name} moved ${distanceInMeters}m.`)
  }
}
class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
  }
}