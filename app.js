var app=angular.module('JSApp', ['ngMaterial']);
app.controller('jsCoompiler',function($scope,$http,$templateCache){
var CSS,JS;
    $scope.run=function(){
        var allele=document.querySelectorAll('textarea');
        $scope.html=allele[0].value
        CSS=allele[1].value;
        JS=allele[2].value;
       
        
    $http.post('http://localhost:7070/appendfile',
               {content:JS,file:'js',name:'result'}).then(function(res){
            },function(err){
                console.log(err);
            });
        
     $http.post('http://localhost:7070/appendfile',
               {content:CSS,file:'css',name:'result'}).then(function(res){
          
            },function(err){
                console.log(err);
            });
        
    $http.post('http://localhost:7070/appendfile',
               {content:$scope.html,file:'html',name:'result'}).then(function(res){
                  
            },function(err){
                console.log(err);
            });
          load_js();
    }
    
    
    $scope.download=function(){
        $http.get('http://localhost:7070/getfile').then(function(res){
               downloadfile(res.data);
            },function(err){
                console.log(err);
            });
        }
    
    function downloadfile(data){
        
        var styleContent=' <style>'+data[2].css+'</style>';
        var scriptContent=' <script>'+data[1].js+'</script>';
        var bodyContent=' <body>'+data[0].html+scriptContent+'</body>';
        var htmlContent='<html>'+'<head>'+styleContent+'</head>'+bodyContent+'</html>';
        console.log(htmlContent);

        $http.post('http://localhost:7070/appendfile',
               {content:htmlContent,file:'html',name:'finalresult'}).then(function(res){  
            var element=document.createElement('a');
            element.setAttribute('href','finalresult.html');
            element.setAttribute('download', 'result.html');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            },function(err){
                console.log(err);
            });
        
    }
    
            function load_js()
           {
              var head= document.getElementsByTagName('head')[0];
              var script= document.createElement('script');
              var style= document.createElement('style');

               
               var inlineScript = document.createTextNode(JS);
               script.appendChild(inlineScript); 
               head.appendChild(script);
               
               
               style.type = 'text/css';
                 if (style.styleSheet){
                      style.styleSheet.cssText = CSS;
                 } else {
                      style.appendChild(document.createTextNode(CSS));
                   }
               head.appendChild(style);
                
           }
   
});

app.filter('to_trusted', ['$sce', function($sce) {
      return function(text) {
        return $sce.trustAsHtml(text);
      };
    }]);
