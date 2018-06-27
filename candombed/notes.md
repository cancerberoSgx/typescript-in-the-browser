ts-simple-ast - not possible to run in the browser - is to tight to filesystem - gracefulfs etc - ... report issue and ask if it's possible to decouple from fs - at least the compiler part.


issue to ts:
Similarl to https://github.com/Microsoft/TypeScript/issues/5967
1) Make the ts.System more decoupled from CompilerHost and others. Particularly in the case of ts.createCompilerHost() doesn't allow to specify a custom ts.System implementation, his brother createWatchCompilerHost does allow it. More, ts.sys is read only so there's no way of providing a filesystem implementation . 
2) provide means to third party (language service) plugins to provide and instal new ts.System implementations
3) Each program shouold be able to use different systems at the same time. 
4) remove utilities like base64/sha that are based on strings are - leave only filesystem access methods
5) signatures should be async to support most non-hard-drive mediums. 
6) perhaps I'm wrong and is ntot system but ModuleResolutionHost ?

regarding 1) 
The only workarounds are 1) implement the CompilerHost itself or to instantiate WatchCompilerHost (without watch suupport if we want it lightweight). But in neightir case 
The CcmpilerHost needs to be implemented it self and that's risky if the objective is to support another medium. Also it doesn't seem to be a way of creating a WatchCompilerHost



