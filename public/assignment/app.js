
/* angular object comes from CDN
   Initiate module by naming it same as the ng-app in index.html
   [] is referring to dependencies (none for now)
 */

// IIFE, stop namespace issues, immediately invokes it
(function(){
    angular.module("WebAppMaker", ["ngRoute"]);
})();
