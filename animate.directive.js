(function(){
    'use strict';

    angular.module('app').directive('accionaDinamicAnimation', accionaDinamicAnimation);

    accionaDinamicAnimation.$inject = ['$rootScope'];

    function accionaDinamicAnimation($rootScope) {
        var directive = {
            restrict: 'A',
            scope: {
                infinite: '=',
                trigger: '=',
                animation: '=',
                time: '=',
                out: '=',
                init: '=',
                onAnimation: '='
            },
            link: link
        };

        return directive;

        function link(scope, element, attrs){
            //TODO hide post animacion
            debugger;
            if(scope.init) {
                element.addClass('ng-hide');
            }
            scope.$watch('trigger', function(newValue, oldValue){
                debugger;
                if(newValue != undefined) {
                    if (newValue.length) {
                        for (var i = 0; i < newValue.length; i++) {
                            if (newValue[i] == true) {
                                if (scope.time != undefined) {
                                    if (scope.time.length) {
                                        if (scope.time[i] != null && scope.time[i] != "") {
                                            var animation = scope.animation[i];
                                            var out = scope.out == undefined ? undefined : scope.out[i];
                                            if (scope.infinite != undefined) {
                                                if (scope.infinite.length) {

                                                    if (scope.infinite[i]) {
                                                        setInterval(function () {
                                                            applyClass(animation, out);
                                                        }, scope.time[i]);
                                                    }
                                                    else {
                                                        setTimeout(function () {
                                                            applyClass(animation, out);
                                                        }, scope.time[i]);
                                                    }
                                                }
                                                else {
                                                    setTimeout(function () {
                                                        applyClass(animation, out);
                                                    }, scope.time[i]);
                                                }
                                            }
                                            else {
                                                setTimeout(function () {
                                                    applyClass(animation, out);
                                                }, scope.time[i]);
                                            }

                                        }
                                        else {
                                            applyClass(scope.animation[i], scope.out == undefined ? undefined : scope.out[i]);
                                        }
                                    }
                                    else {
                                        applyClass(scope.animation[i], scope.out == undefined ? undefined : scope.out[i]);
                                    }
                                }
                                else {
                                    applyClass(scope.animation[i], scope.out == undefined ? undefined : scope.out[i]);
                                }
                            }
                        }
                    }
                    else {
                        if (newValue == true) {
                            if (scope.time != undefined && scope.time != null && scope.time != "") {
                                var animation = scope.animation;
                                var out = scope.out;
                                if (scope.infinite) {
                                    setInterval(function () {
                                        applyClass(animation, out);
                                    }, scope.time);
                                }
                                else {
                                    setTimeout(function () {
                                        applyClass(animation, out);
                                    }, scope.time);
                                }
                            }
                            else {
                                applyClass(scope.animation, out);
                            }
                        }
                    }
                }
            });

            function applyClass(animation, out) {
                debugger;
                scope.onAnimation = true;
                var animationAux = animation;
                var outAux = out == undefined ? false : out;
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

                if (outAux == false)
                {
                    element.removeClass('ng-hide');
                }

                if(!element.hasClass('ng-hide')) {
                    element.addClass('animated ' + animationAux).one(animationEnd, function () {
                        debugger;
                        element.removeClass('animated ' + animationAux);
                        scope.onAnimation = false;
                        scope.$apply();
                        if (outAux == true) {
                            element.addClass('ng-hide');
                        }
                    });
                }
            }
        }
    }
})();/**
 * Created by matias.serrano on 21/6/2017.
 */
