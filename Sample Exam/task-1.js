function solve() {
    var isNameValid = function (name) {
        return name.length >= 3 && name.length <= 30 && name.match(/^[A-z]/);
    };
    var players = (function () {
        var player = {
            init: function (name) {
                if (!(isNameValid(name))) {
                    throw Error();
                }
                this.name = name;
                return this;
            },
            addPlaylist: function (playList) {
                this.playlists.push(playList);
                return this;
            },
            get playlists() {
                if(typeof (this._playlists)==='undefined'){
                    this._playlists = [];
                }
                return this._playlists;
            }
        };
        return {
            get: function (name) {
                return Object.create(player).init(name);
            }
        };
    }());
    var playlists = (function () {
        var playlist = {
            init: function (name) {
                this.name = name;
                return this;
            }
        };

        return {
            get: function(name){
                return Object.create(playlist).init(name);
            }
        }
    }());
    return {
        players: players,
        playlists: playlists
    }
}

module.exports = solve;