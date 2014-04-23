$(document).ready(function(){
  window.dancers = [];
  var numAcross = 12;
  var numHigh = 6;

  var leftChoices = [];
  var topChoices = [];
  var width = $("#danceFloor").width();
  var height = $("#danceFloor").height() - 40;
  for (var i = 0; i < numAcross; i++) {
    leftChoices.push(i/numAcross * width);
  }
  for (var i = 0; i < numHigh; i++) {
    topChoices.push(i/numHigh * height + 40);
  }

  $(".addDancerButton").on("click", function(event){
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");
    var dancerMakerFunction = window[dancerMakerFunctionName];
    var dancer = new dancerMakerFunction(
      topChoices[Math.floor(Math.random() * topChoices.length)],
      leftChoices[Math.floor(Math.random() * leftChoices.length)],
      Math.random() * 1000
    );
    dancer.$node.css({
      width: width / numAcross * 0.9 + "px",
      height: height / numHigh * 0.9 + "px",
      "font-size": width / numAcross * 0.45 + "px",
      "text-align": "center"
    });

    window.dancers.push(dancer);
    $('#danceFloor').append(dancer.$node);
  });

  $("body").on("click", ".dancer", function(event) {
    var targetLeft = $(this).position().left - 1/numAcross * width;
    var targetTop =  $(this).position().top;
    var $leftNode = checkForBlock(targetLeft,targetTop);
    if($leftNode){
      validateMerge($(this),$leftNode);
    } else{
      move($(this));
    }
  });

  var checkForBlock = function(left,top){
    for(var dancer = 0; dancer < window.dancers.length; dancer++){
      var $number = window.dancers[dancer].$node;
      if($number.position().left === left && $number.position().top === top){
        return $number;
      }
    }
    return false;
  };

  var move = function(node, callback){
    callback = callback || null;
    node.animate({ left: "-=" + 1/numAcross * width + "px"},"fast",callback);
  };

  var dontMove = function(node){

  };

  var validateMerge = function(fromNode, toNode){
    var num1 = fromNode.text();
    var num2 = toNode.text();
    if (num1 < 3 && num2 < 3 && num1 !== num2){
      merge(fromNode, toNode);
    } else if (num1 >= 3 && num2 >= 3 && num1 === num2) {
      merge(fromNode, toNode);
    } else {
      console.log("Can't move that!");
    }
  };

  var merge = function(fromNode, toNode) {
    var fromNum = +fromNode.text();
    var toNum = +toNode.text();
    move(fromNode,function(){remove(fromNode);});
    toNode.text(fromNum + toNum);
    if(!toNode.hasClass('scaredDancer')){
      toNode.removeClass("blinkyDancer colorDancer").addClass("scaredDancer");
    }
  };

  var remove = function(node) {
    var numLeft = node.position().left;
    var numTop = node.position().top;
    var numId = checkForBlock(numLeft,numTop).data("dancerid");
    node.remove();
    for(var i = 0; i < window.dancers.length; i++){
      var id = window.dancers[i]._id;
      if(id === numId){
        window.dancers.splice(i,1);
      }
    }
  };

  $("body").on("click", ".lineUp", function(){
    for(var i = 0; i < window.dancers.length; i++){
      window.dancers[i].move(100);
    }
    $(this).text('Dance!');
    $(this).removeClass('lineUp');
    $(this).addClass('dance');
  });

  $("body").on("click", ".dance", function() {
    for (var i = 0; i < window.dancers.length; i++) {
      console.log('working');
      window.dancers[i].move($("#danceFloor").width() * Math.random());
    }
    $(this).text('Line up!').removeClass('dance').addClass('lineUp');
  });

});
