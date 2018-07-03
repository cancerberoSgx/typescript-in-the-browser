// move tis as a separate library
 
export interface ScriptLoadDefinition extends ResourceLoadDefinition {
  scriptBody?: string
  src?: string,
  async?: boolean
  crossorigin?: Boolean
}

export interface StyleLoadDefinition extends ResourceLoadDefinition {
  href?: string
  styleBody?: string
}

export interface ResourceLoadDefinition {
  container?: HTMLElement
  callback?: (arg: any[]) => void
}

export function loadScript(opts: ScriptLoadDefinition): Promise<any[]> {
  return new Promise((resolve, reject) => {
    opts.container = opts.container || document.getElementsByTagName("head")[0]
    opts.callback = opts.callback || (arg => { })

    const script = document.createElement("script")
    const scriptAsAny = script as any
    scriptAsAny.onload = scriptAsAny.onerror = scriptAsAny['onreadystatechange'] = function (...args: any[]) {
      if (scriptAsAny['readyState'] && !(/^c|loade/.test(scriptAsAny['readyState']))) {
        return
      }
      resolve(args)
      opts.callback([])
    }
    script.type = "text/javascript";
    if (opts.src) {
      script.src = opts.src;
      if (opts.crossorigin) {
        script.crossOrigin = "true"
        script.setAttribute('crossorigin', 'true')
      }
      if (opts.async) {
        script.async = true
      } else {
        script.async = false
      }
    }
    else if (opts.scriptBody) {
      script.innerHTML = opts.scriptBody;
    }
    else {
      reject(new Error('href or styleBody must be provided'))
      return
    }
    opts.container.appendChild(script)
    if (!opts.src) {
      resolve([])
      opts.callback([])
    }
  })
}

export function loadCSS(opts: StyleLoadDefinition): Promise<any[]> {
  opts.container = opts.container || document.getElementsByTagName("head")[0]
  opts.callback = opts.callback || (args => { })

  if (opts.href) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', opts.href)
    if (link.media) {
      link.media = 'media'
    }
    opts.container.appendChild(link)
    return Promise.resolve([])
    //TODO: load events and resolve promise there
  }
  else if (opts.styleBody) {
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.innerHTML = opts.styleBody
    opts.container.appendChild(style)
    return Promise.resolve([])
  }
  else {
    return Promise.reject(new Error('href or styleBody must be provided'))
  }
}


export async function loadSeries(opts: (ScriptLoadDefinition | StyleLoadDefinition)[]): Promise<any[][]> {
  const result: any[][] = []
  for (let i = 0; i < opts.length; i++) {
    const value = await load(opts[i])
    result.push(value)
  }
  return result
}

export function load(opts: ScriptLoadDefinition | StyleLoadDefinition): Promise<any[]> {
  if ((opts as any).href || (opts as any).styleBody) {
    return loadCSS(opts as StyleLoadDefinition)
  }
  else {
    return loadScript(opts as ScriptLoadDefinition)
  }
}


export function render(opts: (ScriptLoadDefinition | StyleLoadDefinition) | (ScriptLoadDefinition | StyleLoadDefinition)[]): string {
  if (!Array.isArray(opts)) {
    opts = [opts]
  }
  return opts.map(opts => {
    if ((opts as any).href || (opts as any).styleBody) {
      return renderStyleLoadDefinition(opts as StyleLoadDefinition)
    }
    else {
      return renderScriptLoadDefinition(opts as ScriptLoadDefinition)
    }
  }).join('\n\n')
}

export function renderStyleLoadDefinition(opts: StyleLoadDefinition): string {
  if (opts.href) {
    return `<link rel="stylesheet" type="text/css" href="${opts.href}">`
  }
  else if (opts.styleBody) {
    return `<style>
${opts.styleBody}
</style>`
  }
  else {
    throw new Error('href or styleBody must be provided')
  }
}
export function renderScriptLoadDefinition(opts: ScriptLoadDefinition): string {

  if (opts.src) {
    return `<script type="text/javascript" src="${opts.src}" ${opts.crossorigin ? 'crossorigin' : ''} ${opts.async ? 'async' : ''}></script>`
  }
  else if (opts.scriptBody) {
    return `<script type="text/javascript">
${opts.scriptBody}
</script>`
    return ''
  }
  else {
    throw new Error('src or scriptBody must be provided')
  }
}