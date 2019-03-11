var app = angular.module('cursosApp', ['ngMaterial']);
app.controller('cursosCtrl', function ($scope, $q, $http) {
	$scope.cursos = [];
	$scope.init = function () {
		$scope.cursos = [
			{'titulo':'Reconocimiento y prevención de riesgos laborales', 'path':'reconocimiento'},
			{'titulo':'Normativa vigente de aplicación.', 'path':'normativa'},
			{'titulo':'Riesgo eléctrico.', 'path':'relectrico'},
			{'titulo':'Riesgo mecánico', 'path':'rmecanico'},
			{'titulo': 'Riesgo de incendio y explosiones', 'path':'rincendio'},
			{'titulo':'Elementos de protección personal', 'path':'epp'},
		];
	};
});
$(document).ready(function () {
	init();
});
function init() {
	console.log("Cursos");
}
/*
Reconocimiento y prevención de riesgos laborales
Normativa vigente de aplicación.
Riesgo eléctrico.
Riesgo mecánico
Riesgo de incendio y explosiones
Elementos de protección personal
*/