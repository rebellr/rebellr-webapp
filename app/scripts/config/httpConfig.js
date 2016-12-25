/**
 * Created by seetharama on 12/2/15.
 */
'use strict';

/**
 * This provider can be used to set up properties at config time about how to interact with a REST service or other
 * ajax-based service.  If all of your services use this object, then you have a consistent place to get your
 * service url and base path, as well as whether you are in a top-secret devmode or not.
 *
 */
angular.module('rebellrApp')
  .provider('httpConfig', ['$httpProvider', '$timeoutProvider', function httpConfigProvider ($http, $timeout) {

    var _useCors = false,
      _includeWithCredentialsHeader = true,//default
      _serverUrl = '',//default will just use the default in the browser.
      _corsTestPath = '',
      _basePath = '',
      _devHostParams;  //format example = [{'loginParam':'ucasdev', 'host':'https://ucasdev.lss.emc.com'}]

    //** GETTERS/SETTERS
    //--useCors------------------
    /**
     * I'm finding that in order to provide configuration both during
     * the config phase AND during runtime, I have to provice getters and setters
     * differently
     * @returns {boolean}
     */
    this.getUseCors = function() {
      return _useCors;
    };
    //runtime
    var getUseCors = this.getUseCors;

    //config time
    this.setUseCors = function(inUseCors) {
      _useCors = inUseCors;
    };
    //runtime
    var setUseCors = this.setUseCors;

    //----withCredentialsHeader --------
    this.setIncludeWithCredentialsHeader = function(include) {
      _includeWithCredentialsHeader = include;
    };
    //runtime
    var setIncludeWithCredentialsHeader = this.setIncludeWithCredentialsHeader;

    this.getIncludeWithCredentialsHeader = function() {
      return _includeWithCredentialsHeader;
    };
    var getIncludeWithCredentialsHeader = this.getIncludeWithCredentialsHeader;

    //---serverUrl-------------------
    //config time
    this.getServerUrl = function() {
      return _serverUrl;
    };
    //runtime
    var getServerUrl = this.getServerUrl;

    //config time
    this.setServerUrl = function(inServerUrl) {
      _serverUrl = inServerUrl;
    };
    var setServerUrl = this.setServerUrl;

    //--corsTestPath--------------------
    this.getCorsTestPath = function() {
      return _corsTestPath;
    };
    //runtime
    var getCorsTestPath = this.getCorsTestPath;

    //config time
    this.setCorsTestPath = function(inCorsTestPath) {
      _corsTestPath = inCorsTestPath;
    };
    //runtime
    var setCorsTestPath = this.setCorsTestPath;

    //--basePath--------------------
    this.getBasePath = function() {
      return _basePath;
    };
    //runtime
    var getBasePath = this.getBasePath;

    this.getFullServerUrl = function() {
      return _serverUrl + _basePath;
    };
    var getFullServerUrl = this.getFullServerUrl;

    //config time
    this.setBasePath = function(inBasePath) {
      _basePath = inBasePath;
    };
    //runtime
    var setBasePath = this.setBasePath;

    //--devHostParams-------------------
    this.setDevHostParams = function(inDevHostParams) {
      _devHostParams = inDevHostParams;
    };
    //runtime
    var setDevHostParams = this.setDevHostParams;

    //configtime
    this.getDevHostParams = function() {
      return _devHostParams;
    };
    //runtime
    var getDevHostParams = this.getDevHostParams;

    //** END GETTERS AND SETTERS

    var getLoginParam = function($location) {
      return $location.search().login;
    };

    var getDevModeParam = function($location) {
      return $location.search().devmode;
    };

    var isDevMode = function($location) {
      var devMode = getDevModeParam($location);
      return devMode ? true : false ;
    };

    var setCorsHeaders = function() {
      $http.defaults.useXDomain = true;
      if (_includeWithCredentialsHeader) {
        $http.defaults.withCredentials = true;
      }
      delete $http.defaults.headers.common['X-Requested-With'];
    };

    this.getConfig = function(config) {
      config = config || {};
      config.withCredentials = true;
      if (getUseCors()) {
      }
      return config;
    };
    var getConfig = this.getConfig;

    var testCorsCommunication = function($http, $q, $timeout) {

      var deferred = $q.defer();
      var timeoutCancel = $timeout(function() {
        deferred.reject();
      }, 10000);
      var options = {
        method: 'GET',
        url: _serverUrl + _basePath + _corsTestPath
      };
      if (_includeWithCredentialsHeader) {
        options.withCredentials = true;
      }

      var promise = $http(options);
      promise.success(function() {
        $timeout.cancel(timeoutCancel);
        deferred.resolve(true);
      });
      promise.error(function() {
        $timeout.cancel(timeoutCancel);
        deferred.reject(true);
      });
      return deferred.promise;
    };

    /**
     * If dev login, then we can infer the login url from the login parameter.
     *
     * @param param
     * @returns {string|boolean}
     */
    var getDevLoginHost = function($location) {
      var param = getLoginParam($location);
      var found = _.findWhere(_devHostParams, {loginParam:param});
      if (found) {
        return found.host;
      } else {
        return false;
      }
    };

    this.$get = ['$http', '$q', '$timeout', '$location', function ($http, $q, $timeout, $location) {
      /**
       * if there is a devmode parameter in the url and there is a host match in the devHostParams set during config
       * then we are going to assume that we need to use cors and set the server url
       */
      if (getLoginParam($location)) {
        var host = getDevLoginHost($location);
        if (host) {
          _useCors = true;
          setServerUrl(host);
        }
      }

      if (_useCors) {
        setCorsHeaders($http);
      }

      return {

        /**
         * Enable this to be configured during runtime since the use of cors
         * could depend on a specific runtime situation.
         */
        setUseCors: setUseCors,
        getUseCors: getUseCors,
        /**
         * Enable this to be configured during runtime for flexibility
         */
        setServerUrl: setServerUrl,
        getServerUrl: getServerUrl,
        /**
         * Enable this to be set during runtime for flexibility
         * @param _corsTestUrl
         */
        setCorsTestPath: setCorsTestPath,
        getCorsTestPath: getCorsTestPath,
        /**
         * base path for use in RestService
         * @param _basePath
         */
        setBasePath: setBasePath,
        getBasePath: getBasePath,

        getFullServerUrl: getFullServerUrl,
        getConfig: getConfig,

        /**
         * a flag that can turn off, on the use withCredentials header for cors in case your server is wide open
         * @returns {string|boolean}
         */
        setIncludeWithCredentialsHeader: setIncludeWithCredentialsHeader,
        getIncludeWithCredentialsHeader: getIncludeWithCredentialsHeader,
        /**
         * This will parse the url looking for the login parameter and attempt
         * to find the matching host that has been set in the
         * devHostParams during config.
         * @returns {string}
         */
        getDevLoginHost: function() {
          return getDevLoginHost($location);
        },
        /**
         * This sets the appropriate cors headers.  If there is a login param in the location
         * and a host matches, then this will automatically be called.
         */
        setCorsHeaders: function() {
          setCorsHeaders($http);
        },

        /**
         * You should call this if you are interested in testing that your cors is working
         * @returns {*}
         */
        testCorsCommunication: function() {
          return testCorsCommunication($http, $q, $timeout);
        },

        getLoginParam: function() {
          return getLoginParam($location);
        },

        setDevHostParams: setDevHostParams,
        getDevHostParams: getDevHostParams,

        /**
         * If there is a login param, then we consider you to be in devmode.
         * @returns {*}
         */
        isDevMode: function() {
          return isDevMode($location);
        }
      };
    }];
  }]);
