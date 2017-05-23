(function() {
   /**
   * @function seekBar
   * @desc updates seek Bar (behavior)
   * @param {dependency} $document
   * @return {URL} {Boolean} {Element} {scope}
   */

    function seekBar($document) {
       /**
     * @function calculatePercent
     * @desc determine position of thumb and width of seek bar playback
     * @param seekbar and event handler
     * @return {functions} calculates percent based on value and max value &
     * {value} number of current volume
     */

       var calculatePercent = function(seekBar, event) {
           var offsetX = event.pageX - seekBar.offset().left;
           var seekBarWidth = seekBar.width();
           var offsetXPercent = offsetX / seekBarWidth;
           offsetXPercent = Math.max(0, offsetXPercent);
           offsetXPercent = Math.min(1, offsetXPercent);
           return offsetXPercent;
       };

       return {
           templateUrl: '/templates/directives/seek_bar.html',
           replace: true,
           restrict: 'E',
           scope: {
              onChange: '&'
            },
           link: function(scope, element, attributes) {
               // directive logic to return
              scope.value = 0;
              scope.max = 100;

               var seekBar = $(element);

               attributes.$observe('value', function(newValue) {
                   scope.value = newValue;
               });

               attributes.$observe('max', function(newValue) {
                   scope.max = newValue;
               });

               attributes.$observe('volume', function(newValue) {
                  scope.volume = newValue;
               });


               var percentString = function () {
                 var value = scope.value;
                 var max = scope.max;
                 var percent = value / max * 100;
                 return percent + "%";
              };

              scope.fillStyle = function() {
                return {width: percentString()};
              };


              //assignment 9 acting funny
              scope.thumbStyle = function() {
                return {width: percentString()};
              }


              scope.onClickSeekBar = function(event) {
                  var percent = calculatePercent(seekBar, event);
                  scope.value = percent * scope.max;
                  notifyOnChange(scope.value);
                 };

               scope.trackThumb = function() {
                   $document.bind('mousemove.thumb', function(event) {
                       var percent = calculatePercent(seekBar, event);
                       scope.$apply(function() {
                         scope.value = percent * scope.max;
                         notifyOnChange(scope.value);
                        });
                     });

                     /**
                      * @function notifyOnChange
                      * @desc notify onChange that scope.value has changed
                      * @param {Number} new Value
                      */

                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue});
                     }
                 };



                     $document.bind('mouseup.thumb', function() {
                         $document.unbind('mousemove.thumb');
                         $document.unbind('mouseup.thumb');
                       });
                 };
            }
         };
    }

     angular
         .module('blocJams')
         .directive('seekBar', ['$document', seekBar]);
 })();
