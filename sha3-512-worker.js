importScripts('core-min.js');
importScripts('lib-typedarrays-min.js');
importScripts('sha3.js');

self.algo = CryptoJS.algo.SHA3.create();
self.algo.init({outputLength: 512});

self.addEventListener('message', function(evt){
	var file, fileReader, start, end, chunk, chunks, chunkSize, currentChunk, wordArr, out;
    handle_load_blob=function(e){
		wordArr = CryptoJS.lib.WordArray.create(e.target.result);
		self.algo.update(wordArr);
		out = {'chunk':++currentChunk, 'chunks':chunks};
		if(currentChunk==chunks){
			out.result = self.algo.finalize().toString();
		}
		self.postMessage(out);
		wordArr = null;
		out = null;
		e = null;

		if(end!==file.size){
			fileReader = new FileReader();
			fileReader.onload = handle_load_blob;
			start = currentChunk * chunkSize;
			end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
			fileReader.readAsArrayBuffer(file.slice(start, end));
		}
    }
    file = evt.data;
    currentChunk = 0;
    chunkSize = 2097152; // read in chunks of 2MB
    chunks = Math.ceil(file.size / chunkSize);

	start = currentChunk * chunkSize;
	end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

	fileReader = new FileReader();
	fileReader.onload = handle_load_blob;
	fileReader.readAsArrayBuffer(file.slice(start, end));
}, false);