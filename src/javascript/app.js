(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'templates/home_page.html'
		}).state('Register', {
			url: '/Register',
			templateUrl: 'templates/user_register.html'
		}).state('Login', {
			url: '/Login',
			templateUrl: 'templates/user_login.html'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
