(function() {
  /**
  * @function SongPlayer
  * @desc plays, pauses songs
  * @param {Object} song
  *@return {object}
  */
       function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         var currentAlbum = Fixtures.getAlbum();


         /*
         * @function getSongIndex
         * @desc gets Index of song
         * @param {Object} song
         * return {number}
         */
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
          };


         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
         SongPlayer.currentSong = null;


         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;





         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }

            currentBuzzObject = new buzz.sound(song.audioUrl, {

                formats: ['mp3'],
                preload: true,

            });

            //assignment 11
        //    currentBuzzObject = new buzz.sound(song.audioUrl, {
        //    timer = buzz.toTimer(currentBuzzObject.getDuration()),
        //    document.getElementByClass("totalTime").innerHTML = timer;
        //  });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });


            SongPlayer.currentSong = song;
         };


         /**
         * @function playSong
         * @desc plays  audio file currentBuzzObject and plays song
         * @param {Object} song
         */
         var playSong = function(song) {
           currentBuzzObject.play();
           song.playing = true;

         }





         /**
         * @function play
         * @desc set up song selected to play
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                  setSong(song);
                  playSong(song);


              } else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        playSong(song);

                        }
                    }
          };

          /**
          * @function pause
          * @desc pause song
          * @param {Object} song
          */
          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
          };


          /**
          * @function previous
          * @desc previous song
          * @param {Number} index
          */
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;

              if (currentSongIndex < 0) {
                stopSong();

              } else {
                    var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
              }
          };

          /**
          * @function next
          * @desc next song
          * @param {Number} index
          */
          SongPlayer.next =  function () {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;
                  if (currentSongIndex > -1) {
                    stopSong();

                  } else {
                        var song = currentAlbum.songs[currentSongIndex];
                        setSong(song);
                        playSong(song);
                      }
          };

          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
          SongPlayer.setCurrentTime = function(newValue) {
              if (currentBuzzObject) {
                  currentBuzzObject.setTime(time);
              }
          };

          SongPlayer.setVolume = function (volume) {
              if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
              }

          };

          /**
          * @function stopSong
          * @desc stop current playing song
          * @param {Object} song
          */
          var stopSong = function(song) {
                currentBuzzObject.stop();
                //don't know if should be song.playing = null instead of below assig 8
                SongPlayer.currentSong.playing = null;
          }


         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
