// this is just for being able to import *.json files
declare module "*.json" {
  const value: any;
  export default value;
}