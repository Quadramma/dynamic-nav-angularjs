

angular.module('app',[])

.controller('main',function($scope,$rootScope,$timeout,$http){
	//console.log("main");
	//
	$scope.menuNav 	= 
		{name:'menuNav',route:'/menu',vt:1
		,opts:[
			{l:'Start',go:'startNav',vt:1}
			,{l:'Credits',go:'creditsContent',vt:2}
		]};
	$scope.startNav 	= 
		{name:'startNav',route:'/start',vt:1,tpl:'start.html'
		,opts:[
			{l:'New',go:'newgameContent',vt:2}
			,{l:'Continue',go:'continueOpt'}
		]};
	//
	$scope.newgameContent = {name:'newgameContent',route:'/newgame',tpl:'game.html',vt:2};
	$scope.creditsContent = {name:'creditsContent',route:'/creditos',l:'Creditos Content',tpl:'credits.html',vt:2};
	$scope.error = {name:'error',tpl:"404.html"};
	//
	$scope.states = [$scope.menuNav,$scope.startNav,$scope.newgameContent,$scope.creditsContent];

	//
	
	//Principal
	$scope.context = []; //
	$scope.viewType = 1;
	$scope.contextAnt = [];
	$scope.viewTypeEnum = {
		NAV:1,CONTENT:2
	};
	
	$scope.tpl=function(){
		return $scope.context && $scope.context.tpl || 'blank.html'
	};

	$scope.go=function(goN,vt){
		$scope.viewType = vt;
		$scope.contextAnt = $scope.context;
		$scope.context = $scope[goN];
		$timeout(function(){$scope.$apply();});
		//console.log('go '+goN+' '+vt+' route is '+($scope.context && $scope.context.route || undefined));
		router.navigate($scope.context && $scope.context.route||'/error');
	};


	//ROUTING
	var router = new Grapnel({  root:'/dna'});
	router.bind('hashchange',function(a){
		//console.log(a);
	});
	


	for(var x in $scope.states){
		(function(){
			var s = $scope.states[x];
			router.get(s.route, function(req){
				//console.log('Route '+s.route+' Name is '+s.name);
				if($scope.context && $scope.context.name !== s.name||!$scope.context) $scope.go(s.name,s.vt);
			});		
			//console.log('Route created for '+s.route);
		})();
	}


	router.get('/*', function(req,e){
		if(!e.parent()){
            console.log('404');
	    	$scope.go('error',2);
        }
	});
	//
	//EVENTS
	router.on('navigate', function(event){
	    //console.log('URL changed to %s', this.fragment.get());
	});
	//
	$timeout(function(){
		$scope.$apply(function(){
			//router.navigate('/menu');	//DEFAULT
		})
	},1000);
})

;

