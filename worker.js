importScripts('core-min.js');
importScripts('lib-typedarrays-min.js');
importScripts('md5-min.js');
importScripts('sha1-min.js');
importScripts('sha224.js');
importScripts('sha256-min.js');
importScripts('sha384.js');
importScripts('sha512.js');
importScripts('sha3.js');

self.addEventListener('message', function(evt){
	self.postMessage(evt.data.chunk);
}, false);