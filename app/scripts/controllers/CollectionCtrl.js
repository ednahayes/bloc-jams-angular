(function() {
    function CollectionCtrl(Fixtures) {
      // this was part of the assignment -6 not merged
      //   this.albums = Fixtures.getCollection(12); should replace below?
        this.albums = Fixtures.getCollection(12);

    }


    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
