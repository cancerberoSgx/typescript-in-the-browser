export function fetchFileText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        return new Promise(resolve => {
          const reader = new FileReader()
          reader.readAsText(blob)
          if (!reader.result && !reader.result.toString()) {
            reader.addEventListener("loadend", () => {
              resolve(reader.result.toString())
            })
          }
          else {
            resolve(reader.result.toString())
          }
        })
      })
      .catch(ex => {
        reject(ex)
        throw ex
      })
      .then(responseData => {
        resolve(responseData as string)
      })
      .catch(ex => {
        reject(ex)
      })
  })
}
