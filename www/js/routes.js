angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('login', {
      cache: false,
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
    
    .state('menu', {
      url: '/menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })


    .state('menu.goals', {
      cache: false,
      url: '/goals',
      views: {
        'menu-content': {
          templateUrl: 'templates/goals.html',
          controller: 'goalsCtrl'
        }
      }
    })
    
      
        
    .state('menu.viewgoal', {
        url: '/goals/:viewgoal',
        views: {
          "menu-content": {
            templateUrl: 'templates/goal.html',
            controller: 'goalCtrl'
          }
        }
    })

      
        
    .state('menu.newGoal', {
        cache: false,
        url: '/addGoal',
        views: {
            "menu-content": {
                templateUrl: 'templates/newGoal.html',
                controller: 'newGoalCtrl'
            }
        }
    })

    .state('menu.achievedGoals', {
      url: '/achievedGoals',
      views: {
        'menu-content': {
          templateUrl: 'templates/achievedGoals.html',
          controller: 'achievedGoalsCtrl'
        }
      }
    })

        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});