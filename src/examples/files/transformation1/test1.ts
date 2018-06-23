class Foo {
  magic2(s: number) {
    return s + 5 + 50 + 11 + 99 * 8 * 7 / s
  }
}
const value = new Foo().magic2(1 + 2 + 3)