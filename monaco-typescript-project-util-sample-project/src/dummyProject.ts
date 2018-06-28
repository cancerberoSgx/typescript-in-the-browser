import { AbstractProject } from '../../monaco-typescript-project-util/dist/src';

export function getDummyProject(): AbstractProject {
  return {
    name: 'sample-project',
    files: [
      {
        "fileName": "package.json",
        "content": "{\n  \"name\": \"ts-sample-project\",\n  \"version\": \"1.0.0\",\n  \"description\": \"\",\n  \"main\": \"index.js\",\n  \"scripts\": {\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n  },\n  \"keywords\": [],\n  \"author\": \"\",\n  \"license\": \"ISC\",\n  \"devDependencies\": {\n    \"typescript\": \"^2.9.2\"\n  }\n}\n"
      },
      {
        "fileName": "src/model/Apple.ts",
        "content": "import { Fruit } from './Fruit';\nimport { Living } from './Living';\n\nexport class Apple implements Fruit {\n  age: number;\n  private eater: Living | undefined;\n  constructor(public parent: Living) {\n    this.age = 0\n\n  }\n  kill(): Promise<boolean> {\n    this.age = -1\n    return Promise.resolve(true)\n  }\n  consume(who: Living): Promise<number> {\n    return this.kill().then((killed) => {\n      this.eater=who\n      if (killed) {\n        return Promise.resolve(3)\n      }\n      else { \n        return Promise.resolve(1) \n      }\n    })\n  }\n}"
      },
      {
        "fileName": "src/index.ts",
        "content": "import { Apple } from './model/Apple';\nimport { Tree } from './model/Tree';\n\nnew Apple(new Tree()).consume(new Tree()).then(energy=>{\n  console.log('apple consumed and eater gain '+energy+ ' energy')\n})"
      },
      {
        "fileName": "src/model/Fruit.ts",
        "content": "import { Living } from './Living';\n\nexport interface Fruit extends Living{\n  parent: Living\n  consume(who: Living): Promise<number>\n}"
      },
      {
        "fileName": "src/model/Living.ts",
        "content": "export interface Living{\n  age: number;\n  kill(): Promise<boolean>\n}"
      },
      {
        "fileName": "src/model/Tree.ts",
        "content": "import { Living } from './Living';\n\nexport class Tree implements Living {\n  age: number = 0;\n  kill(): Promise<boolean> {\n    this.age = -1\n    return Promise.resolve(true)\n  }\n}"
      },
      {
        "fileName": "tsconfig.json",
        "content": "{\n  \"compilerOptions\": {\n    \"target\": \"es6\",\n    \"module\": \"commonjs\",\n    \"strict\": true,\n    \"lib\": [\n      \"es6\", \"dom\"\n    ],\n    \"esModuleInterop\": true,\n    \"rootDir\": \"./src\", \n    \"outDir\": \"./dist\"\n  }\n}"
      }
    ]
  }
}