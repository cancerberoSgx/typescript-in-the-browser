// class Animal implements Living {
//   energy: number
//   constructor(public name: string) { }
//   move(distanceInMeters: number = 0) {
//     console.log(`${this.name} moved ${distanceInMeters}m.`)
//   }
// }
// interface Living {
//   energy: number
// }
// class Snake extends Animal {
//   constructor(name: string) { super(name); }
//   move(distanceInMeters = 5) {
//     console.log("Slithering...");
//     super.move(distanceInMeters);
//   }
// }
// const words: string[] = []
// function randomIdentifier(what: 'variable' | 'class' = 'variable', amountOfWords: number = 2): string {
//   let w = words[random(0, words.length - 1)]
//   return what === 'class' ? camel(w) : w
// }
// function random(a: number, b: number):number {
//   return Math.floor(Math.random() * b) + a
// }
// function camel(w: string):string {
//   return w.substring(0, 1).toUpperCase() + w.substring(1, w.length)
// }