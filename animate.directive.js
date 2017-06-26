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
                init: '='
            },
            link: link
        };

        return directive;

        function link(scope, element, attrs){

            //TODO hide post animacion
            if(scope.init) {
                element.addClass('ng-hide');
            }
            scope.$watch('trigger', function(newValue, oldValue){
                /*if (scope.time!= undefined){
                    console.log("scope.time!= undefined");
                    console.log(scope.time);
                    console.log(newValue);
                    console.log(scope.animation);
                    console.log(scope.infinite);
                }*/
                console.log(newValue);
                if(newValue.length) {
                    for (var i = 0; i < newValue.length; i++) {

                        if(newValue[i] == true) {
                            if (scope.time != undefined) {
                                if (scope.time.length) {
                                    if (scope.time[i] != null && scope.time[i] != "") {
                                        var animation = scope.animation[i];
                                        var out = scope.out == undefined ? undefined : scope.out[i];
                                        if (scope.infinite != undefined)
                                        {
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
                else
                {
                    if(newValue == true) {
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
                            applyClass(scope.animation);
                        }
                    }
                }
            });

            function applyClass(animation, out) {
                var animationAux = animation;
                var outAux = out;
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

                if (outAux == false)
                {
                    element.removeClass('ng-hide');
                }
                if(!element.hasClass('ng-hide')) {
                    element.addClass('animated ' + animationAux).one(animationEnd, function () {
                        element.removeClass('animated ' + animationAux);

                        if (outAux == true) {
                            element.addClass('ng-hide');
                        }
                    });
                }
            }

        }

        /**
         * @name timeFromTo
         * @desc Arma el array de horas, cada 1 hora en un intervalo de tiempo dado
         * @param {Number} timeFrom Hora desde que inicia el período de tiempo
         * @param {Number} timeTo Hora hasta que finaliza el período de tiempo
         * @return {Array}
         */

    }
})();/**
 * Created by matias.serrano on 21/6/2017.
 */
