importScripts('core-min.js');
importScripts('lib-typedarrays-min.js');
importScripts('md5-min.js');
importScripts('sha1-min.js');
importScripts('sha224.js');
importScripts('sha256-min.js');
importScripts('sha384.js');
importScripts('sha512.js');
importScripts('sha3.js');

self.md5 = CryptoJS.algo.MD5.create();

self.addEventListener('message', function(evt){
	var wordArr = CryptoJS.lib.WordArray.create(evt.data.blob);
	self.md5.update();
	out = {'chunk':evt.data.chunk}
	if(evt.data.chunk==evt.data.chunks){
		out.result = self.md5.finalize().toString();
	}
	evt = null;
	wordArr = null;
	self.postMessage(out);
}, false);