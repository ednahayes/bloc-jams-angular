(function() {
    function config($stateProvider, $locationProvider) {
        $locationProvider
        // the hashband ("#!") URLs are disabled by setting html5Mode method enabled property to true
        // requireBase property to false is unrelated but avoids a common $location error
          .html5Mode({
              enabled: true,
              requireBase: false
            });
        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl as landing',
                templateUrl: '/templates/landing.html'
            })
            .state('album', {
              url: '/album',
              controller: 'AlbumCtrl as album',
              templateUrl: '/templates/album.html'
            })

            .state('collection', {
                url: '/collection',
                controller: 'CollectionCtrl as collection',
                templateUrl: '/templates/collection.html'
            });

    }
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();
