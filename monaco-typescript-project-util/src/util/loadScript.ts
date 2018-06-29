export interface LoadScriptOptions {
  callback?: (arg:  any[]) => void,
  src?: string,
  innerHTML?: string
  async?: boolean
  crossorigin?: boolean
  container?: HTMLElement
}

export function loadScript(opts: LoadScriptOptions): Promise< any[]> {
  return new Promise((resolve, reject)=>{
    // debugger;
    opts.container = opts.container || document.getElementsByTagName("head")[0]
    opts.callback = opts.callback || (arg=>{})

    const script = document.createElement("script")
    const scriptAsAny = script as any
    scriptAsAny.onload = scriptAsAny.onerror = scriptAsAny['onreadystatechange'] = function (...args: any[]) {
     
      if ((scriptAsAny['readyState'] && !(/^c|loade/.test(scriptAsAny['readyState'])))) {return; }
      resolve(args)
      // scriptAsAny.onload = scriptAsAny['onreadystatechange'] = null
      // loaded = 1
      // scriptAsAnys[path] = 2
      // fn()
    }

    script.type = "text/javascript";
    if (opts.src) {
      script.src = opts.src;
    }
    if (opts.innerHTML) {
      script.innerHTML = opts.innerHTML;
    }
    if(opts.crossorigin){
      script.crossOrigin="true"
      script.setAttribute('crossorigin', 'true')
    }
    if(opts.async){
      script.async=true
    }else{

      script.async=false
    }

    opts.container.appendChild(script);

    // if ((script as any).readyState) { //IE
    //   (script as any).onreadystatechange = function (...args: any[]) {
    //     if ((script as any).readyState == "loaded" ||
    //       (script as any).readyState == "complete") {
    //       (script as any).onreadystatechange = null;
    //       resolve(args)
    //       opts.callback(args);
    //     }
    //   }
    // } 
    
    // else if(script.onload) {  //Others
    //   script.onload = function(...args: any[]){
    //     resolve( args)
    //     opts.callback(args)
    //   }
    // }
    // else if(script.src) {
    //   const error = new Error('Browser unsupported - has not script.onload and not script.readyState')
    //   reject(error)
    //   opts.callback([error])
    // } 
    // else {
    //   resolve([])
    //   opts.callback([])
    // }
    if(!opts.src){
      resolve([])
      opts.callback([])
    }
  })
}

export function loadCSS(href: string, container: HTMLElement = document.getElementsByTagName("head")[0]) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.crossOrigin="true"
  link.setAttribute('crossorigin', "true")
  link.setAttribute('href', href)
  document.getElementsByTagName("head")[0].appendChild(link);
}
 