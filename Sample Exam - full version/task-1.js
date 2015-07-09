function solve() {
    var playable = (function () {
        var idCounter = 0;
        var playable = {
            init: function (title, author) {
                this.title = title;
                this.author = author;
                this.id = idCounter+=2;
                return this;
            }
        };

        Object.defineProperties(playable, {
            title: {
                get: function () {
                    return this._title;
                },
                set: function (value) {
                    this._title = value;
                }
            },
            author: {
                get: function () {
                    return this._author;
                },
                set: function (value) {
                    this._author = value;
                }
            },
            play: {
                value: function () {
                    return this.id + '. ' + this.title + ' - ' + this.author;
                }
            }
        });

        return playable;
    }());

    var video = (function (Parent) {
        var video = Object.create(Parent);
        Object.defineProperties(video, {
            init: {
                value: function (id, title, author, imdbRating) {
                    Parent.init.call(this, id, title, author);
                    this.imdbRating = imdbRating;
                    return this;
                }
            },
            imdbRating: {
                get: function () {
                    return this._imdbRating;
                },
                set: function (value) {
                    this._imdbRating = value;
                }
            },
            play: {
                value: function () {
                    return Parent.play.call(this) + ' - ' + this.imdbRating;
                }
            }
        });

        return video;
    }(playable));

    var audio = (function (Parent) {
        var audio = Object.create(Parent);
        Object.defineProperties(audio, {
            init: {
                value: function (id, title, author, length) {
                    Parent.init.call(this, id, title, author);
                    this.length = length;
                    return this;
                }
            },
            length: {
                get: function () {
                    return this._length;
                },
                set: function (value) {
                    this._length = value;
                }
            },
            play: {
                value: function () {
                    return Parent.play.call(this) + ' - ' + this.length;
                }
            }
        });

        return audio;
    }(playable));

    var player = (function () {
        var idCounter = 0;
        var player = {
            init: function (name) {
                this.name = name;
                this.id = idCounter += 1;
                this.playlists = [];
                return this;
            }
        };

        Object.defineProperties(player, {
            name: {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                }
            },
            addPlaylist: {
                value: function (playlistToAdd) {
                    this.playlists.push(playlistToAdd);
                    return this;
                }
            },
            getPlaylistById: {
                value: function (id) {
                    if(typeof id === 'undefined'&& !this.playlists && this.playlists.length === 0){
                        throw new Error();
                    }
                    for (var i = 0; i < this.playlists.length; i += 1) {
                        if (this.playlists[i].id === id) {
                            return this.playlists[i];
                        }
                    }
                    return null;
                }
            },
            removePlaylist: {
                value: function (argument) { //could be obj or number
                    var index = -1,
                        i;
                    if(typeof argument === 'object'){

                        for (i = 0; i < this.playlists.length; i += 1) {
                            if(this.playlists[i] === argument){
                                index = i;
                            }
                        }
                        if(index > -1){
                             this.playlists.splice(index,1);
                            return this;
                        } else {
                            throw new Error();
                        }

                    } else {

                        for ( i = 0; i < this.playlists.length; i += 1) {
                            if(this.playlists[i].id === argument){
                                index = i;
                            }
                        }
                        if(index > -1){
                             this.playlists.splice(index,1);
                            return this;
                        } else {
                            throw new Error();
                        }

                    }
                }
            }

        });

        return player;
    }()); //need to finish it

    var playlist = (function () {
        var countId = 0;

        var playlist = {
            init: function (name) {
                this.name = name;
                this.id = countId += 1;
                this.playables = [];
                return this;
            }
        };

        Object.defineProperties(playlist, {
            name: {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                }
            },
            addPlayable: {
                value: function (playable) {
                    this.playables.push(playable);
                    return this;
                }
            },
            getPlayableById: {
                value: function (id) {
                    for (var i = 0; i < this.playables.length; i += 1) {
                        if (this.playables[i].id === id) {
                            return this.playables[i];
                        }
                    }
                }
            },
            removePlayable: {
                value: function (argument) { //could be obj or number
                    var index = -1,
                        i;
                    if (typeof(argument) === 'undefined') {
                        throw new Error();
                    }
                    if (typeof(argument) !== 'number') {
                        argument = argument.id;
                    }
                    for (i = 0; i < this.playables.length; i += 1) {
                        if (this.playables[i].id == argument) {
                            index = i;
                            break;
                        }
                    }
                    if (index < 0) {
                        throw new Error();
                    }
                    
 console.log(this);
                    console.log(this.playables);
                    this.playables.splice(index, 1);
                    //console.log(this);
                     console.log(this.playables);
                    return this.playables;
                }
            },
            listPlayables:{
                value: function (page, size) {
                    if(typeof(page) === 'undefined'|| typeof(size) === 'undefined' ||
                        page * size > this.playables.length
                        || page <0 || size <=0){
                        throw new Error();
                    }
                    var sortedPlayables = this.playables.sort(function (firstPlayable, secondPlayable) {
                        if(firstPlayable.name === secondPlayable.name){
                            return firstPlayable.id - secondPlayable.id;
                        }
                        return firstPlayable.name.localeCompare(secondPlayable.name);
                    });
                    if(this.playables.length < size){
                        return sortedPlayables;
                    }

                    return sortedPlayables.slice(page * size, (page + 1) * size);
                }
            }
        });
        return playlist;
    }());

    var module = {
        getPlayer: function (name) {
            return Object.create(player).init(name);
        },
        getPlaylist: function (name) {
            return Object.create(playlist).init(name);
        },
        getAudio: function (title, author, length) {
            return Object.create(audio).init(title, author, length);
        },
        getVideo: function (title, author, imdbRating) {
            return Object.create(video).init(title, author, imdbRating);
        }
    };
    return module;
}
module.exports = solve;
//var module = solve();
//player = module.getPlayer('pesho');
// console.log();
//playlist = module.getPlaylist('gosho');
//player.addPlaylist(playli