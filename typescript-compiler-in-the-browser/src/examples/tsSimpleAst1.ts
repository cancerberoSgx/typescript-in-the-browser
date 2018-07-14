
import * as ts from 'typescript';
import { Example , ExampleExecutionOptions } from '../compiler/types';
import { log } from '../compiler/util/uiUtil';
import { getFiles } from './exampleFilesManager';
import Project, { ClassDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, MethodSignature, Node, ParameterDeclaration, PropertyDeclaration, PropertySignature, TypeGuards, VariableDeclaration } from 'ts-simple-ast'

export default class implements Example {
  id = 'tsSimpleAst1'
  name = 'ts-simple-ast renaming lots of nodes'
  description = "Example using ts-simple-ast rename() tool - will rename randomly almost every identifier found in the input. Very crazy and heuristic - don't try this at home!"
  files = getFiles().filter(f => f.fileName.includes(`files/${this.id}`))
  exampleSource = getFiles().find(f => f.fileName.includes(`examples/${this.id}`))
  execute = (options: ExampleExecutionOptions) => {
    const project = new Project({
      useVirtualFileSystem: true,
      compilerOptions: { target: ts.ScriptTarget.ES2018 }
    })
    options.program.getSourceFiles().forEach(f=>{
      const sourceFile = project.createSourceFile(f.fileName, f.getText())
      let d: T
      const visited: {[key: string]: boolean} = {}
      // heads up - we will be changing the AST radically when calling rename() since it wi have impact on the entire project
      // That's why we need to query the source file each time. This could be slow for large source sets. 
      // More information at: https://dsherret.github.io/ts-simple-ast/manipulation/
      while ((d = sourceFile.getDescendants().find(n => predicate(n) && !visited[(n as T).getName()]) as T)) {
        if (predicateProperties(d)) {
          const name = randomName('variable')
          d.rename(name)
          visited[name] = true
        }
        else if (predicateClasses(d)) {
          const name = randomName('class')
          d.rename(name)
          visited[name] = true
        }
      }
      log('Transformed source file: ')
      log(sourceFile.getText())
    })
  }
}

type T = ParameterDeclaration | FunctionDeclaration | VariableDeclaration | ClassDeclaration |
  InterfaceDeclaration | PropertyDeclaration | PropertySignature | MethodDeclaration | MethodSignature

const predicateProperties = (d: Node): boolean =>
  (TypeGuards.isParameterDeclaration(d) || TypeGuards.isFunctionDeclaration(d) ||
  TypeGuards.isPropertyDeclaration(d) || TypeGuards.isMethodDeclaration(d) ||
  TypeGuards.isPropertySignature(d) || TypeGuards.isMethodSignature(d) || TypeGuards.isVariableDeclaration(d))

const predicateClasses = (d: Node): boolean =>(  TypeGuards.isClassDeclaration(d) || TypeGuards.isInterfaceDeclaration(d))

const predicate = (d: Node): boolean => (predicateProperties(d) || predicateClasses(d))

// very heuristic identifier random generation - dont try this at home!
const dic: {[key: string]: boolean} = {}
function randomName(what: 'variable' | 'class' = 'variable', amountOfWords: number = 2) {
  let v
  while ((v = randomIdentifier(what, amountOfWords) + random(0, 9999)) && dic[v]) { }
  dic[v] = true
  return v
}
function randomIdentifier(what: 'variable' | 'class' = 'variable', amountOfWords: number = 2): string {
  let w = words[random(0, words.length - 1)]
  return what === 'class' ? camel(w) : w
}
function camel(w: string) {
  return w.substring(0, 1).toUpperCase() + w.substring(1, w.length)
}
function random(a:number, b:number) {
  return Math.floor(Math.random() * b) + a
}
const words = `lorem ipsum dolor sit amet consectetuer adipiscing elit fusce tellus odio dapibus id fermentum quis suscipit erat nam sed magna elementum tincidunt praesent vitae arcu tempor neque lacinia pretium etiam dictum diam curabitur sagittis hendrerit ante duis aute irure in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur pulvinar eleifend sem nibh ut enim ad minima veniam nostrum exercitationem ullam corporis laboriosam nisi aliquid ex ea commodi consequatur aliquam ornare wisi metus turpis cursus a interdum felis autem vel eum iure qui quam nihil molestiae illum dolorem quo voluptas integer bibendum eget vestibulum ullamcorper nec rutrum non nonummy ac volutpat phasellus rhoncus lectus viverra nunc faucibus libero facilisis lacus nemo ipsam voluptatem quia aspernatur aut odit fugit consequuntur magni dolores eos ratione sequi nesciunt aenean placerat imperdiet justo fringilla maecenas pharetra pellentesque massa nullam molestie nisl malesuada lobortis at dui morbi leo mi tristique minim nostrud exercitation ullamco laboris aliquip commodo consequat risus tortor gravida vehicula vivamus orci venenatis pede mauris et harum quidem rerum facilis est expedita distinctio sapien class aptent taciti sociosqu litora torquent per conubia nostra inceptos hymenaeos luctus quisque scelerisque egestas habitant senectus netus fames donec congue vulputate iaculis cum sociis natoque penatibus magnis dis parturient montes nascetur ridiculus mus auctor ligula sollicitudin purus excepteur sint occaecat cupidatat proident sunt culpa officia deserunt mollit anim laborum proin dignissim feugiat condimentum augue semper accumsan varius mollis porro quisquam consectetur adipisci numquam eius modi tempora incidunt labore magnam quaerat ultrices ultricies cras temporibus quibusdam officiis debitis necessitatibus saepe eveniet voluptates repudiandae recusandae posuere porttitor tempore soluta nobis eligendi optio cumque impedit minus quod maxime placeat facere possimus omnis assumenda repellendus suspendisse mattis convallis aliquet euismod tempus laoreet itaque earum hic tenetur sapiente delectus reiciendis voluptatibus maiores alias perferendis doloribus asperiores repellat`.split(/[\n\s]+/).map(w => w && w.toLowerCase().replace(/[\.]/mg, '')).filter((w, i, arr) => arr.indexOf(w) === i)
