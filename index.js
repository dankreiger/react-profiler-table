"use strict";var e=require("react");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=t(e),o=[];module.exports=function(t){var r,i=t.id,a=t.callback,c=t.children;return n.default.createElement(e.Profiler,{id:i,onRender:(r=a,void 0===r&&(r=function(){}),function(e,t,n,i,a,c,d){console.table(o.push({id:e,phase:t,actualDuration:n,baseDuration:i,startTime:a,commitTime:c,interactions:d})),console.log("\n%cRender count: %c"+o.length+"%c\n"+"_".repeat(28)+"\n\n\n","font-size: 16px; color: #20232a;","padding: 15px; width: 80px; height: 80px; border-radius: 50%; background: #20232a; font-weight: bold; font-size: 20px; color: #61dafb;",""),r()})},c)};
