!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.activate=void 0;const r=n(1),i=n(2),o=/^(\S.*):$/,a=/^(\s+)(\d+)(:| )(\s+)(.*)$/,l={language:"search-result"},c=["# Query:","# Flags:","# Including:","# Excluding:","# ContextLines:"],s=["RegExp","CaseSensitive","IgnoreExcludeSettings","WordMatch"];let u,g;function d(e,t){if(i.isAbsolute(e))return r.Uri.file(e);if(0===e.indexOf("~/"))return r.Uri.file(i.join(process.env.HOME,e.slice(2)));const n=(e,t)=>e.uri.with({path:i.join(e.uri.fsPath,t)});if(r.workspace.workspaceFolders){const i=/^(.*) • (.*)$/.exec(e);if(i){const[,e,t]=i,o=r.workspace.workspaceFolders.filter(t=>t.name===e)[0];if(o)return n(o,t)}else{if(1===r.workspace.workspaceFolders.length)return n(r.workspace.workspaceFolders[0],e);if("untitled"!==t.scheme){const i=r.workspace.workspaceFolders.filter(e=>t.toString().startsWith(e.uri.toString()))[0];if(i)return n(i,e)}}}console.error("Unable to resolve path "+e)}t.activate=function(e){const t=r.window.createTextEditorDecorationType({opacity:"0.7"}),n=r.window.createTextEditorDecorationType({fontWeight:"bold"}),i=e=>{const r=x(e.document).filter(p),i=r.filter(e=>e.isContext).map(e=>e.prefixRange),o=r.filter(e=>!e.isContext).map(e=>e.prefixRange);e.setDecorations(t,i),e.setDecorations(n,o)};r.window.activeTextEditor&&"search-result"===r.window.activeTextEditor.document.languageId&&i(r.window.activeTextEditor),e.subscriptions.push(r.languages.registerDocumentSymbolProvider(l,{provideDocumentSymbols:(e,t)=>x(e,t).filter(f).map(e=>new r.DocumentSymbol(e.path,"",r.SymbolKind.File,e.allLocations.map(({originSelectionRange:e})=>e).reduce((e,t)=>e.union(t),e.location.originSelectionRange),e.location.originSelectionRange))}),r.languages.registerCompletionItemProvider(l,{provideCompletionItems(e,t){const n=e.lineAt(t.line);if(t.line>3)return[];if(0===t.character||1===t.character&&"#"===n.text){const n=Array.from({length:c.length}).map((t,n)=>e.lineAt(n).text);return c.filter(e=>n.every(t=>-1===t.indexOf(e))).map(e=>({label:e,insertText:e.slice(t.character)+" "}))}return-1===n.text.indexOf("# Flags:")?[]:s.filter(e=>-1===n.text.indexOf(e)).map(e=>({label:e,insertText:e+" "}))}},"#"),r.languages.registerDefinitionProvider(l,{provideDefinition(e,t,n){const i=x(e,n)[t.line];if(!i)return[];if("file"===i.type)return i.allLocations;return[{...i.location,targetSelectionRange:(o=i.location.targetSelectionRange,a=t.character-1,o.with({start:new r.Position(o.start.line,Math.max(0,a-o.start.character)),end:new r.Position(o.end.line,Math.max(0,a-o.end.character))}))}];var o,a}}),r.languages.registerDocumentLinkProvider(l,{provideDocumentLinks:async(e,t)=>x(e,t).filter(({type:e})=>"file"===e).map(({location:e})=>({range:e.originSelectionRange,target:e.targetUri}))}),r.window.onDidChangeActiveTextEditor(e=>{"search-result"===(null==e?void 0:e.document.languageId)&&(u=void 0,null==g||g.dispose(),g=r.workspace.onDidChangeTextDocument(t=>{t.document.uri===e.document.uri&&i(e)}),i(e))}),{dispose(){u=void 0,null==g||g.dispose()}})};const f=e=>"file"===e.type,p=e=>"result"===e.type;function x(e,t){if(u&&u.uri===e.uri&&u.version===e.version)return u.parse;const n=e.getText().split(/\r?\n/),i=[];let l=void 0,c=void 0;for(let s=0;s<n.length;s++){if(null==t?void 0:t.isCancellationRequested)return[];const u=n[s],g=o.exec(u);if(g){const[,t]=g;if(l=d(t,e.uri),!l)continue;c=[];const n={targetRange:new r.Range(0,0,0,1),targetUri:l,originSelectionRange:new r.Range(s,0,s,u.length)};i[s]={type:"file",location:n,allLocations:c,path:t}}if(!l)continue;const f=a.exec(u);if(f){const[,e,t,n,o]=f,a=+t-1,g=(e+t+n+o).length,d=(e+t+n).length,p={targetRange:new r.Range(Math.max(a-3,0),0,a+3,u.length),targetSelectionRange:new r.Range(a,d,a,d),targetUri:l,originSelectionRange:new r.Range(s,g,s,u.length)};null==c||c.push(p),i[s]={type:"result",location:p,isContext:" "===n,prefixRange:new r.Range(s,0,s,d)}}}return u={version:e.version,parse:i,uri:e.uri},i}},function(e,t){e.exports=require("vscode")},function(e,t){e.exports=require("path")}]));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/e5e9e69aed6e1984f7499b7af85b3d05f9a6883a/extensions/search-result/dist/extension.js.map