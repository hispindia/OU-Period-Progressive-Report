!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("dhis2API",[],t):"object"==typeof exports?exports.dhis2API=t():e.dhis2API=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=2)}([function(e,t){e.exports=function(e){this.get=function(t,n){t=e+t;var o=new XMLHttpRequest;o.open("GET",t,!0),o.onload=function(){if(o.status>=200&&o.status<400){var e=JSON.parse(o.responseText);n(null,o,e)}else n(o,null,null)},o.onerror=function(e){n(e,null,null)},o.send()},this.getReq=function(e,t){return new Promise((t,n)=>{this.getReq(e,function(e,n,o){t(e,n,o)})})},this.post=function(t,n,o){t=e+t;var r=new XMLHttpRequest;r.open("POST",t,!0),r.setRequestHeader("Content-Type","application/json"),r.onload=function(){if(r.status>=200&&r.status<400){var e=JSON.parse(r.responseText);o(null,r,e)}else o(r,null,null)},r.onerror=function(e){o(e,null,null)},r.send(JSON.stringify(n))},this.update=function(t,n,o){t=e+t;var r=new XMLHttpRequest;r.open("PUT",t,!0),r.setRequestHeader("Content-Type","application/json"),r.onload=function(){if(r.status>=200&&r.status<400){var e=JSON.parse(r.responseText);o(null,r,e)}else o(r,null,null)},r.onerror=function(e){o(e,null,null)},r.send(JSON.stringify(n))},this.remove=function(t,n){t=e+t;var o=new XMLHttpRequest;o.open("DELETE",t,!0),o.setRequestHeader("Content-Type","application/json"),o.onload=function(){if(o.status>=200&&o.status<400){var e=JSON.parse(o.responseText);n(null,o,e)}else n(o,null,null)},o.onerror=function(e){n(e,null,null)},o.send()}}},function(e,t,n){var o=n(0);e.exports=new function(){var e=new o("../../");this.metadataService=function(){this.getObj=function(t){return new Promise((n,o)=>{e.get(t,function(e,t,r){e?o(e):n(r)})})}},this.getManifest=function(){var e=new o("./");return new Promise((t,n)=>{e.get("manifest.webapp",function(e,o,r){e?n(e):t(r)})})},this.dataElementService=function(){this.getDataElements=function(t,n){return new Promise((n,o)=>{e.get("dataElements?fields="+t,function(e,t,r){e?o(e):n(r)})})}},this.userService=function(){this.getCurrentUser=function(t,n){return new Promise((n,o)=>{e.get("me?fields="+t,function(e,t,r){e?o(e):n(r)})})}},this.organisationUnitService=function(){this.getOUGroups=function(t,n){return new Promise((n,o)=>{e.get("organisationUnitGroups?paging=false&fields="+t,function(e,t,r){e?o(e):n(r)})})}},this.sqlViewService=function(){this.dip=function(e,t,n){var o={name:e+Math.random(1),sqlQuery:t,displayName:"temp",description:"temp",type:"QUERY"};this.create(o,(e,t,o)=>{e&&n(e,t,o);var r=o.response.uid;this.getData(r,(e,t,o)=>{n(null,t,o)}),setTimeout(()=>{this.remove(r,function(e,t,n){e&&console.log("Could not delete SQLView"+e)})},100)})},this.getData=function(t,n){e.get("sqlViews/"+t+"/data",n)},this.create=function(t,n){e.post("sqlViews?",t,n)},this.remove=function(t,n){e.remove("sqlViews/"+t,n)}},this.periodService=function(){this.getPeriods=function(e,t,n){switch(e){case"Monthly":default:return o()}function o(){for(var e=[],t=(new Array("January","February","March","April","May","June","July","August","September","October","November","December"),new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")),n=new Date,o=n.getFullYear(),r=n.getMonth(),i=o;i>=1990;i--){for(;-1!=r;){var s="",u=r+1;u<10&&(s="0"),e.push({id:i+s+u,name:t[r]+" "+i}),r-=1}r=11}return e}}},this.dataStoreService=function(t){this.getAllKeyValues=function(){return new Promise((n,o)=>{e.get("dataStore/"+t,(e,t,o)=>{if(e);else{var r=[];o.forEach(e=>{r.push(this.getValue(e))}),Promise.all(r).then(function(e){n(e)})}})})},this.getValue=function(n,o){if(!o)return new Promise((o,r)=>{e.get("dataStore/"+t+"/"+n,function(e,t,n){o(e||n)})});e.get("dataStore/"+t+"/"+n,o)},this.remove=function(n,o){e.remove("dataStore/"+t+"/"+n,o)},this.saveOrUpdate=function(n,o){e.update("dataStore/"+t+"/"+n.key,n,function(r,i,s){r||"ERROR"==s.status?e.post("dataStore/"+t+"/"+n.key,n,function(e,t,n){if(e)return console.log("Couldn't save data store key value"),void o(e,null,null);o(e,t,n)}):(console.log("Updated Key"),o(r,i,s))})}}}},function(e,t,n){e.exports=n(1)}])});