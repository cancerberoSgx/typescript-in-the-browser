export interface Fruit extends Eatable {
  parentTree: number[][]
}
/**
 * an eatable can be eaten
 */
export interface Eatable {
  energy: number
}