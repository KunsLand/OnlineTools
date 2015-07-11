importScripts('core-min.js');
importScripts('lib-typedarrays-min.js');
importScripts('sha224.js');

self.algo = CryptoJS.algo.SHA224.create();

self.addEventListener('message', function(evt){
	var wordArr = CryptoJS.lib.WordArray.create(evt.data.blob);
	self.algo.update(wordArr);
	out = {'chunk':evt.data.chunk, 'chunks':evt.data.chunks};
	if(evt.data.chunk==evt.data.chunks){
		out.result = self.algo.finalize().toString();
	}
	evt = null;
	wordArr = null;
	self.postMessage(out);
}, false);