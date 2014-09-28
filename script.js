var app = angular.module('WWCC', ['dots'])


app.factory('shared', function() {
   return{
      
      
   myHealth: 6,
   mySize: 5,
   myWillpower: 2,
   
  
   setHealth: function(newVal){
     this.myHealth = this.mySize + newVal; 
   },
  setWillpower: function(val1, val2){
     this.myWillpower = val1 + val2; 
   }

}});



var AttrCtrl = function($scope, shared){

   $scope.physicalAttr = [
      {name: "Strength", value: 1},
      {name: "Dexterity", value: 1},
      {name: "Stamina", value: 1},
      ];

   $scope.mentalAttr = [
      {name: "Intelligence",value: 1},
      {name: "Wits", value: 1},
      {name: "Resolve", value: 1},
      ];

   $scope.socialAttr = [
      {name: "Presence", value: 1},
      {name: "Manipulation", value: 1},
      {name: "Composure", value: 1},
      ];
      
   $scope.min = 1;

   
   $scope.checkMin = function(event, model, index){
      
         if(model[index].name== "Stamina"){
            
            shared.setHealth(model[index].value);
            
                     }
         else if(model[index].name== "Composure"||"Resolve") {
            shared.setWillpower($scope.mentalAttr[2].value, $scope.socialAttr[2].value);
         }
         
   };


};


var AdvCtrl = function($scope,shared) {
   $scope.details = shared;
   $scope.PowerStat= {Min:1, Max: 10, Now: 1};
   $scope.Fuel={Min:0, Max: 10, Now: 0};


};
var SkillCtrl = function($scope, shared){
   $scope.mentalSkills = [
     {name: "Academics", value: 0},
     {name: "Computer", value: 0},
     {name: "Crafts", value: 0},
     {name: "Investigation", value: 0},
     {name: "Medicine", value: 0},
     {name: "Occult", value: 0},
     {name: "Politics", value: 0},
     {name: "Science", value: 0}
     ];
     
     $scope.physicalSkills = [
     {name: "Athletics", value: 0},
     {name: "Brawl", value: 0},
     {name: "Drive", value: 0},
     {name: "Firearms", value: 0},
     {name: "Larceny", value: 0},
     {name: "Stealth", value: 0},
     {name: "Survival", value: 0},
     {name: "Weaponry", value: 0}
     ];
     
     $scope.socialSkills = [
     {name: "Animal Ken", value: 0},
     {name: "Empathy", value: 0},
     {name: "Expression", value: 0},
     {name: "Intimidation", value: 0},
     {name: "Persuasion", value: 0},
     {name: "Socialize", value: 0},
     {name: "Streetwise", value: 0},
     {name: "Subterfuge", value: 0}
     ];
   $scope.min = 0;

};

var TraitsCtrl  = function($scope,shared) {
   
   $scope.meritsTaken = [
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0}
      ];
      
      $scope.powersTaken = [
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0},
      {name:" ", value: 0}
      ];
      

      $scope.min = 0;

};
