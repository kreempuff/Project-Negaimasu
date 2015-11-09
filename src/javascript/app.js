(function() {
  'use strict';
  angular.module('app', ['ui.router', 'ngMaterial'])
    .config(stateConfig)
    .config(themeConfig);
  stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  themeConfig.$inject = ['$mdThemingProvider'];

  function themeConfig($mdThemingProvider) {
		$mdThemingProvider.theme('default')
    .primaryPalette('blue', {
			'default': '900'
		})
    .accentPalette('purple');
	}

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('Home', {
      url: '/',
      templateUrl: 'templates/home_page.html'
    }).state('Register', {
      url: '/Register',
      templateUrl: 'templates/user_register.html'
    }).state('Login', {
      url: '/Login',
      templateUrl: 'templates/user_login.html'
    }).state('Welcome', {
      url: '/welcome',
      templateUrl: 'templates/welcome_page.html'
    });
    $urlRouterProvider.otherwise('/');
  }
})();
