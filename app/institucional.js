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
      { titulo: 'De la construcción', path: 'construccion.html' , icono: 'construct'},
      { titulo: 'Del agro', path: 'agro.html' , icono: 'bug'},
      { titulo: 'De la mineria', path: 'mineria.html' , icono: 'hammer'},
      { titulo: 'Enfermedades profesionales', path: 'enfermedades.html' , icono: 'medkit'},
      { titulo: 'Leyes generales', path: 'generales.html' , icono: 'book'},
      { titulo: 'Protocolos', path: 'protocolos.html' , icono: 'git-pull-request'},
      { titulo: 'Servicios de salud y seguridad', path: 'servicios.html', icono: 'heart-half' }
    ];
  };
});

ca.controller('caCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de la construcción";
  $scope.init = function () {
    var deferred;
    deferred = $q.defer();
    $http.get('../../admin/api/institucional/ca').then(function (resultado) {
      var response = resultado['data'];
      angular.forEach(response, function (value, key) {
        if (value.habilitado) {
          if (value.tipo == 1) {
            $scope.documentacion.push(value);
          }
          else {
            value['url'] = "https://www.youtube.com/embed/" + value['path'];
            $scope.videos.push(value);
          }
        }
      });
    }).catch(function (resultado) {
      deferred.reject(resultado);
    });
    return deferred.promise;
  };
});
aa.controller('aaCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "del agro";
  $scope.init = function () {
    var deferred;
    deferred = $q.defer();
    $http.get('../../admin/api/institucional/aa').then(function (resultado) {
      var response = resultado['data'];
      angular.forEach(response, function (value, key) {
        if (value.habilitado) {
          if (value.tipo == 1) {
            $scope.documentacion.push(value);
          }
          else {
            value['url'] = "https://www.youtube.com/embed/" + value['path'];
            $scope.videos.push(value);
          }
        }
      });
    }).catch(function (resultado) {
      deferred.reject(resultado);
    });
    return deferred.promise;
  };
});
ma.controller('maCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de la mineria";
  $scope.init = function () {
    var deferred;
    deferred = $q.defer();
    $http.get('../../admin/api/institucional/ma').then(function (resultado) {
      var response = resultado['data'];
      angular.forEach(response, function (value, key) {
        if (value.habilitado) {
          if (value.tipo == 1) {
            $scope.documentacion.push(value);
          }
          else {
            value['url'] = "https://www.youtube.com/embed/" + value['path'];
            $scope.videos.push(value);
          }
        }
      });
    }).catch(function (resultado) {
      deferred.reject(resultado);
    });
    return deferred.promise;
  };
});
ea.controller('eaCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de enfermedades profesionales";
  $scope.init = function () {
    var deferred;
    deferred = $q.defer();
    $http.get('../../admin/api/institucional/ea').then(function (resultado) {
      var response = resultado['data'];
      angular.forEach(response, function (value, key) {
        if (value.habilitado) {
          if (value.tipo == 1) {
            $scope.documentacion.push(value);
          }
          else {
            value['url'] = "https://www.youtube.com/embed/" + value['path'];
            $scope.videos.push(value);
          }
        }
      });
    }).catch(function (resultado) {
      deferred.reject(resultado);
    });
    return deferred.promise;
  };
});
pa.controller('paCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de leyes generales";
  $scope.init = function () {
    var deferred;
    deferred = $q.defer();
    $http.get('../../admin/api/institucional/pa').then(function (resultado) {
      var response = resultado['data'];
      angular.forEach(response, function (value, key) {
        if (value.habilitado) {
          if (value.tipo == 1) {
            $scope.documentacion.push(value);
          }
          else {
            value['url'] = "https://www.youtube.com/embed/" + value['path'];
            $scope.videos.push(value);
          }
        }
      });
    }).catch(function (resultado) {
      deferred.reject(resultado);
    });
    return deferred.promise;
  };
});
ga.controller('gaCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de protocolos";
  $scope.init = function () {
    var deferred;
    deferred = $q.defer();
    $http.get('../../admin/api/institucional/ga').then(function (resultado) {
      var response = resultado['data'];
      angular.forEach(response, function (value, key) {
        if (value.habilitado) {
          if (value.tipo == 1) {
            $scope.documentacion.push(value);
          }
          else {
            value['url'] = "https://www.youtube.com/embed/" + value['path'];
            $scope.videos.push(value);
          }
        }
      });
    }).catch(function (resultado) {
      deferred.reject(resultado);
    });
    return deferred.promise;
  };
});
sa.controller('saCtrl', function ($scope, $q, $http) {
  $scope.documentacion = [];
  $scope.titulo = "de servicios de salud y seguridad";
  $scope.init = function () {
    var deferred;
    deferred = $q.defer();
    $http.get('../../admin/api/institucional/sa').then(function (resultado) {
      var response = resultado['data'];
      angular.forEach(response, function (value, key) {
        if (value.habilitado) {
          if (value.tipo == 1) {
            $scope.documentacion.push(value);
          }
          else {
            value['url'] = "https://www.youtube.com/embed/" + value['path'];
            $scope.videos.push(value);
          }
        }
      });
    }).catch(function (resultado) {
      deferred.reject(resultado);
    });
    return deferred.promise;
  };
});
function init() {
  console.log("Cargado Institucional");
}
