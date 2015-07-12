importScripts('core-min.js');
importScripts('lib-typedarrays-min.js');
importScripts('md5.js');
importScripts('sha1.js');
importScripts('sha224.js');
importScripts('sha256.js');
importScripts('sha384.js');
importScripts('sha512.js');
importScripts('sha3.js');

self.algo = null;

self.addEventListener('message', function(evt){
		if(evt.data.algo==="MD5"){
			self.algo = CryptoJS.algo.MD5.create();
		}
		else if(evt.data.algo.toUpperCase()==="SHA1"){
			self.algo = CryptoJS.algo.SHA1.create();
		}
		else if(evt.data.algo.toUpperCase()==="SHA2-224"){
			self.algo = CryptoJS.algo.SHA224.create();
		}
		else if(evt.data.algo.toUpperCase()==="SHA2-256"){
			self.algo = CryptoJS.algo.SHA256.create();
		}
		else if(evt.data.algo.toUpperCase()==="SHA2-384"){
			self.algo = CryptoJS.algo.SHA384.create();
		}
		else if(evt.data.algo.toUpperCase()==="SHA2-512"){
			self.algo = CryptoJS.algo.SHA512.create();
		}
		else if(evt.data.algo.toUpperCase()==="SHA3-224"){
			self.algo = CryptoJS.algo.SHA3.create();
			self.algo.init({outputLength: 224});
		}
		else if(evt.data.algo.toUpperCase()==="SHA3-256"){
			self.algo = CryptoJS.algo.SHA3.create();
			self.algo.init({outputLength: 256});
		}
		else if(evt.data.algo.toUpperCase()==="SHA3-384"){
			self.algo = CryptoJS.algo.SHA3.create();
			self.algo.init({outputLength: 384});
		}
		else if(evt.data.algo.toUpperCase()==="SHA3-512"){
			self.algo = CryptoJS.algo.SHA3.create();
			self.algo.init({outputLength: 512});
		}
		else{
			self.algo = CryptoJS.algo.MD5.create();
		}
		hashFile(evt.data.file, self);
}, false);

function hashFile(file, worker){
	var fileReader, start, end, chunkSize;
    handle_load_blob=function(e){
		worker.algo.update(CryptoJS.lib.WordArray.create(e.target.result));
		if(end===file.size){
			worker.postMessage({'result':worker.algo.finalize().toString()});
		} else {
			worker.postMessage({'progress': (end/file.size*100).toFixed(2)});
			fileReader = new FileReader();
			fileReader.onload = handle_load_blob;
			start += chunkSize;
			end = start + chunkSize;
			end = end>file.size? file.size: end;
			fileReader.readAsArrayBuffer(file.slice(start, end));
		}
    }
    chunkSize = 2097152; // read in chunks of 2MB

	start = 0;
	end = start + chunkSize;
	end = end>file.size? file.size: end;

	fileReader = new FileReader();
	fileReader.onload = handle_load_blob;
	fileReader.readAsArrayBuffer(file.slice(start, end));
}