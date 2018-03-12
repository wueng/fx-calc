'use strict';

(function () {

  function resize($window, $uibPosition, $timeout, $rootScope) {

    const SCREEN_XS_MAX = 768;
    const SCREEN_SM_MIN = 480;

    return (scope, element, attrs) => {

      let property = attrs.resize ? (scope[attrs.resize] = {}) : scope;

      if (attrs.resizeFn) {
        scope.resizeFn = scope.$eval(attrs.resizeFn);
      }

      let minHeight = attrs.resizeMinHeight || 0;

      scope.resizeProperty = attrs.resizeProperty || 'max-height';
      let offsetTopMinus = attrs.resizeOffsetTop ? parseInt(attrs.resizeOffsetTop) : 0;
      let offsetTopMinusXs = attrs.resizeOffsetTopXs ? parseInt(attrs.resizeOffsetTopXs) : offsetTopMinus;

      function resizeOffsetTop(newValue) {
        let offset = newValue.windowWidth > SCREEN_SM_MIN ? offsetTopMinus : offsetTopMinusXs;
        if (!newValue || $rootScope.hasInputInFocus || newValue.disableResize) {
          return;
        }
        let height = newValue.windowHeight - newValue.offsetTop - offset;
        if (height < minHeight) {
          height = minHeight;
        }
        element.css(scope.resizeProperty, height + 'px');
      }

      function getWindowDimensions() {
        let offset = $uibPosition.offset(element);
        //let bodyRect = $window.document.body.getBoundingClientRect();
        return {
          windowHeight: $window.innerHeight,// - bodyRect.top,
          windowWidth: $window.innerWidth,
          offsetTop: offset ? offset.top : 0,
          disableResize: !!$rootScope.hasInputInFocus
        };
      }

      function setValues(newValue) {
        if (!newValue || newValue.disableResize || $rootScope.hasInputInFocus) {
          return;
        }
        _.assign(property, newValue);
        _.assign(property, {
          xsWidth: _.get(newValue, 'windowWidth') < SCREEN_XS_MAX
        });
        if (scope.resizeFn) scope.resizeFn(property, element);
      }

      let un = scope.$watch(
        getWindowDimensions,
        angular.isDefined(attrs.resizeOffsetTop) ? resizeOffsetTop : setValues,
        true
      );

      let apply = _.throttle(() => {
        scope.$apply();
      }, 100);

      angular.element($window)
        .bind('resize', apply);

      scope.$on('$destroy', () => {
        un();
        angular.element($window)
          .unbind('resize', apply);
      });

      $timeout(setValues);
    }

  }

  angular.module('app')
    .directive('resize', resize);

})();
