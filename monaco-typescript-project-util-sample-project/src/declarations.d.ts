// needed so typescript let us import .hbs files as text
declare module '*.hbs' {
  const value: string;
  export default value
}