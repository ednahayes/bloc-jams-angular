(function() {
    function CollectionCtrl() {
      // this was part of the assignment -6 not merged
      //   this.albums = Fixtures.getCollection(12); should replace below?
        this.albums = [];
        for (var i=0; i < 12; i++) {
            this.albums.push(angular.copy(albumPicasso));
          }
    }

    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();
