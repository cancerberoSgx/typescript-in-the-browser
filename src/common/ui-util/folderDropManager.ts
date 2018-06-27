// @ts-nocheck

// TODO: this is old js - adapt to typescript or get a better lib
// working in chrome and firefox - put it in its own project!

// @ts-ignore
export interface FolderDropManager {
  // @ts-ignore
  install(el: HTMLElement, listener: (e: FolderDropManagerEvent) => void)
  // @ts-ignore
  uninstall(el: HTMLElement, listener: (e: FolderDropManagerEvent) => void)
}
export interface FolderDropManagerEvent {
  type: 'read'|'error'|'finish'
  file: FolderDropManagerFile
}
export interface FolderDropManagerFile {
  fullPath: string
  isDirectory: boolean
  isFile: boolean
  entries?: FolderDropManagerFileEntry[]
  isBinary?: boolean
  content?: string
  item: FolderDropManagerFileEntry
  file?: FolderDropManagerFileFile
}

export interface FolderDropManagerFileFile {
  lastModified: number
  lastModifiedDate: Date
  name: string
  size: number
  type: string
}
export interface FolderDropManagerFileEntry {
  fullPath: string
  isDirectory: boolean
  isFile: boolean
  name: string
}
/**
 * a FolderDDManager instance can be installed on a DOm Element and mange all the files 
 * (recursively) contained in a dropped folder by the user. Then it will work for collecting 
 * all the file contents and returns (async) a structure of all the files. It will detect and 
 * not extract content of binary files. 
 * @class FolderDDManager
 */
function  FolderDDManager () { };
export function createFolderDropManager(): FolderDropManager{
  // @ts-ignore
  return new FolderDDManager()
}
const proto = FolderDDManager.prototype;

const w = (window as any)
w.requestFileSystem = w.requestFileSystem || w.webkitRequestFileSystem;
w.resolveLocalFileSystemURL = w.webkitResolveLocalFileSystemURL ||
  w.webkitResolveLocalFileSystemURL;
// @ts-ignore
proto.error = function (e) {
  console.log('error', e);
  this.notifyListener({type: 'error', error: e})
  throw e
};
// @ts-ignore
proto.error_from_readentries = function (e) {
  console.log('error_from_readentries', e);
  this.notifyListener({type: 'error', error: e})
  throw e
};
// @ts-ignore
proto.traverseFileTree = function (item, path) {
  path = path || "";
  var self = this;
  if (item.isFile) {
    // Get file
    // @ts-ignore
    item.file(function (file) {
      self.readFileText(file, item, path);
    }
      , self.error.bind(self)
    );
  } else if (item.isDirectory) {

    // Get folder contents
    var dirReader = item.createReader();
    // @ts-ignore
    dirReader.readEntries(function (entries) {

      const fileInfo = { item, isFile: false, isDirectory: true, fullPath: item.fullPath, entries }
      self.notifyListener({ type: 'read', file: fileInfo })

      if (entries)
        for (var i = 0; i < entries.length; i++) {
          self.traverseFileTree(entries[i], path + item.name + "/");
        }
    }
      , self.error_from_readentries.bind(self)
    );
  }
};
/**
@method isBinary
*/
// @ts-ignore
proto.isBinary = function (str) {
  //we guess by comparing form 3rd char to 100 for if charcode>=65533
  if (str.length < 3) {
    return false; //the problem are big binary files. 
  }
  for (var i = 2; i < Math.min(str.length - 1, 100); i++) {
    if (str.charCodeAt(i) >= 65533) {
      return true;
    }
  }
  return false;
};
/**
@method readFileText
*/
// @ts-ignore
proto.readFileText = function (file, item, path) {
  var reader = new FileReader();
  var self = this;
  reader.readAsText(file);
  reader.addEventListener('loadend', function (e) {
    var isBinary = self.isBinary(reader.result);
    // @ts-ignore
    const fileInfo = { file, fullPath: item.fullPath, item, isDirectory: item.isDirectory, isBinary, isFile: item.isFile, content: undefined }
    if (isBinary) {
      // console.log('BINARYFILE');
      // TODO: read binary
    }
    else {
      fileInfo.content = reader.result.toString()
    }
    self.notifyListener({ type: 'read', file: fileInfo })

  });
};

// TODO. a very very heuristic method to realize if the data transfer has finished (just a timeout). TODO: research and do this better.
// @ts-ignore
proto.emitFileEventFinish = function(fn){
  this.lastFileEventTime = performance.now()
  this.emitFileEventFinishTimer = setInterval(()=>{
    if(performance.now()-this.emitFileEventFinishTimer>1000){
      clearInterval(this.emitFileEventFinishTimer)
      this.notifyListener({type: 'finish'})
    }
  }, 1000)
}
// @ts-ignore
proto.notifyListener = function(e){
  this.emitFileEventFinish = performance.now()
  this.listener(e)
}
// @ts-ignore
proto.handleDrop = function (evt) {
  evt.stopPropagation();
  evt.preventDefault();
  this.emitFileEventFinish(()=>{
    this.listener({type: 'finish'})
  })
  var items = evt.dataTransfer.items || evt.dataTransfer.files;
  for (var i = 0; i < items.length; i++) {
    var item = items[i].getAsEntry ? items[i].getAsEntry() : items[i].webkitGetAsEntry ? items[i].webkitGetAsEntry() : undefined;
    if (item) {
      this.traverseFileTree(item);
    }
  }
};
// @ts-ignore
proto.handleDragOver = function (evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
};
/**
@method install 
@param el HTMLElement
@param listener Function
*/
// @ts-ignore
proto.install = function (el: HTMLElement, listener) {
  this.listener = listener;
  this.handleDropListenerFn = this.handleDrop.bind(this)
  this.handleDragOverListenerFn = this.handleDragOver.bind(this)
  el.addEventListener("drop", this.handleDropListenerFn, false);
  el.addEventListener("dragover",this. handleDragOverListenerFn, false);
};

// @ts-ignore all
proto.uninstall = function (el: HTMLElement, listener) {
  delete this.listener
  el.removeEventListener("drop", this.handleDropListenerFn, false);
  el.addEventListener("dragover",this.handleDragOverListenerFn, false);
};
// @ts-nocheck