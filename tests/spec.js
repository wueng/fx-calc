describe('Calc', function () {
    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.formOpts', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('Calc', { $scope: $scope });
        });

        it('variable formOpts is defined', function () {
           // expect($scope.a).toEqual(5);
            expect($scope.formOpts).toBeDefined;
        });

    });
});