var ins = angular.module('institucionalApp', ['ngMaterial']);
var ca = angular.module('construccionApp', ['ngMaterial']);
var aa = angular.module('agroApp', ['ngMaterial']);
var ma = angular.module('mineriaApp', ['ngMaterial']);
var ea = angular.module('enfprofesionalesApp', ['ngMaterial']);
var pa = angular.module('protocolosApp', ['ngMaterial']);
var ga = angular.module('generalesApp', ['ngMaterial']);
var sa = angular.module('serviciosApp', ['ngMaterial']);


ca.config(function ($sceDelegateProvider) { $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**']); });
aa.config(function ($sceDelegateProvider) { $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**']); });
ma.config(function ($sceDelegateProvider) { $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**']); });
ea.config(function ($sceDelegateProvider) { $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**']); });
pa.config(function ($sceDelegateProvider) { $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**']); });
ga.config(function ($sceDelegateProvider) { $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**']); });
sa.config(function ($sceDelegateProvider) { $sceDelegateProvider.resourceUrlWhitelist(['self', '*://www.youtube.com/**']); });

ins.controller('institucionalCtrl', function ($scope, $q, $http) {
  $scope.documentaciones = [];
  $scope.init = function () {
    $scope.documentaciones = [
      { titulo: 'De la construcción', path: 'construccion.html', icono: 'construct' },
      { titulo: 'Del agro', path: 'agro.html', icono: 'bug' },
      { titulo: 'De la mineria', path: 'mineria.html', icono: 'hammer' },
      { titulo: 'Enfermedades profesionales', path: 'enfermedades.html', icono: 'medkit' },
      { titulo: 'Leyes generales', path: 'generales.html', icono: 'book' },
      { titulo: 'Protocolos', path: 'protocolos.html', icono: 'git-pull-request' },
      { titulo: 'Servicios de salud y seguridad', path: 'servicios.html', icono: 'heart-half' }
    ];
  };
});

ca.controller('caCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de la construcción";
  $scope.init = function () {
    $scope.documentacion.push(
      { categoria: "De la construcción", habilitado: "1", idinstitucional: "12", path: "ca/Dec_911_96.pdf", tipo: "1", titulo: "Dec 911 96", user_iduser: "3", },
      { categoria: "De la construcción", habilitado: "2", idinstitucional: "12", path: "ca/Res_231_96_SRT_Reglamentación del Decreto 911 96.pdf ", tipo: "1", titulo: "Reglamentación del Decreto 911_96.pdf", user_iduser: "3", },
      { categoria: "De la construcción", habilitado: "3", idinstitucional: "12", path: "ca/Res_SRT_319_99.pdf", tipo: "1", titulo: "Res SRT 319 99", user_iduser: "3", },
      { categoria: "De la construcción", habilitado: "4", idinstitucional: "12", path: "ca/Res_SRT_35_98.pdf", tipo: "1", titulo: "Res SRT 35 98", user_iduser: "3", },
      { categoria: "De la construcción", habilitado: "5", idinstitucional: "12", path: "ca/Res_SRT_51_97.pdf", tipo: "1", titulo: "Res SRT 51 97", user_iduser: "3", },
      { categoria: "De la construcción", habilitado: "6", idinstitucional: "12", path: "ca/Res_SRT_550_11.pdf", tipo: "1", titulo: "Res SRT 550 11", user_iduser: "3", },
    );

    // var deferred;
    // deferred = $q.defer();
    // $http.get('../../admin/api/institucional/ca').then(function (resultado) {
    //   var response = resultado['data'];
    //   angular.forEach(response, function (value, key) {
    //     if (value.habilitado) {
    //       if (value.tipo == 1) {
    //         $scope.documentacion.push(value);
    //       }
    //       else {
    //         value['url'] = "https://www.youtube.com/embed/" + value['path'];
    //         $scope.videos.push(value);
    //       }
    //     }
    //   });
    // }).catch(function (resultado) {
    //   deferred.reject(resultado);
    // });
    // return deferred.promise;
  };
});
aa.controller('aaCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "del agro";
  $scope.init = function () {
    $scope.documentacion.push(
      { categoria: "Del agro", habilitado: "1", idinstitucional: "1", path: "aa/Decreto_617_97.pdf", tipo: "1", titulo: "Decreto 617 97", user_iduser: "3", },
    );

  };
});
ma.controller('maCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de la mineria";
  $scope.init = function () {
    $scope.documentacion.push(
      { categoria: "De la mineria", habilitado: "1", idinstitucional: "1", path: "ma/Dec_249_07.pdf", tipo: "1", titulo: "Dec 249 07", user_iduser: "3", },
    );
  };
});
ea.controller('eaCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de enfermedades profesionales";
  $scope.init = function () {
    $scope.documentacion.push(
      { categoria: "Enfermedades profesionales", habilitado: "1", idinstitucional: "1", path: "ea/Dec_658_96.pdf", tipo: "1", titulo: "Dec 658 96", user_iduser: "3", },
    );

  };
});
ga.controller('gaCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de leyes generales";
  $scope.init = function () {
    $scope.documentacion.push(
      { categoria: "Enfermedades profesionales", habilitado: "1", idinstitucional: "1", path: "ga/Dec_1338_96.pdf", tipo: "1", titulo: "Dec 1338 96", user_iduser: "3", },
      { categoria: "Enfermedades profesionales", habilitado: "1", idinstitucional: "2", path: "ga/Dec_351_79.pdf", tipo: "1", titulo: "Dec 351 79", user_iduser: "3", },
      { categoria: "Enfermedades profesionales", habilitado: "1", idinstitucional: "3", path: "ga/Ley_19587_72.pdf", tipo: "1", titulo: "Ley 19587 72", user_iduser: "3", },
      { categoria: "Enfermedades profesionales", habilitado: "1", idinstitucional: "4", path: "ga/Ley_24557_95.pdf", tipo: "1", titulo: "Ley 24557 95", user_iduser: "3", },
    );
  };
});
pa.controller('paCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de protocolos";
  $scope.init = function () {
    $scope.documentacion.push(
      { categoria: "Protocolos", habilitado: "1", idinstitucional: "1", path: "pa/Res_RST_866_15_Ergonomia.pdf", tipo: "1", titulo: "Res RST 866 15 Ergonomia", user_iduser: "3", },
      { categoria: "Protocolos", habilitado: "1", idinstitucional: "2", path: "pa/Res_SRT_85_12_Protocolo_Ruido.pdf", tipo: "1", titulo: "Res SRT 85 12 Protocolo Ruido", user_iduser: "3", },
      { categoria: "Protocolos", habilitado: "1", idinstitucional: "3", path: "pa/Res_SRT_900_15_Protocolo_PAT.pdf", tipo: "1", titulo: "Res SRT 900 15 Protocolo PAT", user_iduser: "3", },
      { categoria: "Protocolos", habilitado: "1", idinstitucional: "4", path: "pa/Res_SRT_84_12_Protocolo_Iluminacion.pdf", tipo: "1", titulo: "Res SRT 84 12 Protocolo Iluminacion", user_iduser: "3", },
      { categoria: "Protocolos", habilitado: "1", idinstitucional: "5", path: "pa/Res_SRT_861_15_Protocolo_Contaminantes_Quimicos.pdf", tipo: "1", titulo: "Res SRT 861 15 Protocolo Contaminantes Quimicos", user_iduser: "3", },
    );
  };
});
sa.controller('saCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de servicios de salud y seguridad";
  $scope.init = function () {
    $scope.documentacion.push(
      { categoria: "Servicios de salud y seguridad", habilitado: "1", idinstitucional: "1", path: "sa/Dec_1338_96.pdf", tipo: "1", titulo: "Dec 1338 96", user_iduser: "3", },
    );
  };
});
function init() {
  console.log("Cargado Institucional");
}
