(function(Q) {
	'use strict';
	
	this.sync = {};
	
	sync.printArtistAlbums = function (artistName) {
		var artist = sync.findArtist(artistName);
		var albums = sync.findAlbums(artist);
		sync.render(albums);
	};
	
	sync.findArtist = function(query) {
		var uri = 'https://ws.spotify.com/search/1/artist?q=' + encodeURI(query);
		var response = sync.getJson(uri);
		
		return response.artists[0];
	};
	
	sync.findAlbums = function(artist) {
		if(artist === undefined) {
			throw new Error('artist undefined');
		}
		var uri = 'https://ws.spotify.com/lookup/1/?uri=' + encodeURI(artist.href) + '&extras=albumdetail';
		var response = sync.getJson(uri);
		var albums = response.artist.albums;
		albums.artist = artist;
		
		return albums;
	}
	
	sync.render = function(albums) {
		var container = document.getElementById('container');
		var albumList = container.querySelector('ul');
		
		container.querySelector('h2').textContent = albums.artist.name;
		albumList.innerHTML = '';
		
		for(var album of albums) {
			var li = document.createElement('li');
			li.textContent = album.album.released + ' - ' + album.album.name;
			albumList.appendChild(li);
		}
		
		container.classList.add('active');
	};
	
	sync.getJson = function(url) {
		var response = sync.getURL(url);
		return JSON.parse(response);
	};
	
	sync.getURL = function(url) {
		var request = new XMLHttpRequest();
		request.open('GET', url, false);
		request.setRequestHeader('Accept', 'application/json');
		request.send();
		
		if(request.status !== 200) {
			throw 'request failed';
		}
		
		return request.response;
	};
	
	
	this.cb = {};
	
	cb.printArtistAlbums = function(artistName, callback) {
		cb.findArtist(artistName, function(err, artist) {
			if(err) {
				return typeof callback === 'function' && callback(err);
			}
			cb.findAlbums(artist, function(err, albums) {
				if(err) {
					return typeof callback === 'function' && callback(err);
				}
				cb.render(albums, callback);
			});
		});
	};
	
	cb.findArtist = function(query, callback) {
		var uri = 'https://ws.spotify.com/search/1/artist?q=' + encodeURI(query);
		
		cb.getJson(uri, function(err, response) {
			if(err) {
				return callback(err);
			}
			callback(null, response.artists[0]);
		});
	};
	
	cb.findAlbums = function(artist, callback) {
		var uri = 'https://ws.spotify.com/lookup/1/?uri=' + encodeURI(artist.href) + '&extras=albumdetail';
		
		cb.getJson(uri, function(err, response) {
			if(err) {
				return callback(err);
			}
			console.info(artist, response);
			var albums = response.artist.albums;
			albums.artist = artist;
			
			callback(null, albums);
		});
	}
	
	cb.render = function(albums, callback) {
		try {
			sync.render(albums);
			callback(null);
		}
		catch(exception) {
			callback(exception);
		}
	};
	
	cb.getJson = function(url, callback) {
		cb.getURL(url, function(err, response) {
			if(err) {
				return callback(err);
			}
			
			try {
				callback(null, JSON.parse(response));
			}
			catch(exception) {
				callback(exception);
			}
		});
	};
	
	cb.getURL = function(url, callback) {
		var request = new XMLHttpRequest();
		request.open('GET', url);
		request.setRequestHeader('Accept', 'application/json');
		request.send();
		
		request.onload = function() {
			if(request.status !== 200) {
				callback('request failed');
			}
			
			callback(null, this.response);
		};
	};
	
	
	this.promise = {};
	
	promise.printArtistAlbums = function(artistName) {
		return promise.findArtist(artistName)
			.then(promise.findAlbums)
			.then(promise.render);
	};
	
	promise.findArtist = function(query) {
		var uri = 'https://ws.spotify.com/search/1/artist?q=' + encodeURI(query);
		
		return promise.getJson(uri).then(function(response) {
			return response.artists[0];
		});
	};
	
	promise.findAlbums = function(artist) {
		if(artist === undefined) {
			throw new Error('artist undefined');
		}
		var uri = 'https://ws.spotify.com/lookup/1/?uri=' + encodeURI(artist.href) + '&extras=albumdetail';
		return promise.getJson(uri).then(function(response) {
			var albums = response.artist.albums;
			albums.artist = artist;
			
			return albums;
		});
	}
	
	promise.render = sync.render;
	
	promise.getJson = function(url) {
		return promise.getURL(url).then(JSON.parse);
	};
	
	promise.getURL = function(url) {
		var deferred = Q.defer();
		
		var request = new XMLHttpRequest();
		request.open('GET', url);
		request.setRequestHeader('Accept', 'application/json');
		request.send();
		
		request.onload = function() {
			if(request.status !== 200) {
				deferred.reject(new Error('request failed'));
			}
			
			deferred.resolve(this.response);
		};
		
		return deferred.promise;
	};
	
	
	this.pg = {};
	
	pg.printArtistAlbums = Q.async(function*(artistName) {
		var artist = yield promise.findArtist(artistName);
		var albums = yield promise.findAlbums(artist);
		promise.render(albums);
	});
	
	document.getElementById('container').addEventListener('wheel', function(event) {
		event.stopPropagation();
	});
	
	document.getElementById('container').addEventListener('click', function(event) {
		this.classList.remove('active');
	});
}).call(window, Q);
