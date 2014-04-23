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
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
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
    var canMove = true;
    for(var dancer = 0; dancer < window.dancers.length; dancer++){
      var $node = window.dancers[dancer].$node;
      if($node.position().left === targetLeft && $node.position().top === targetTop) {
        canMove = false;
        validateMerge($(this), $node);
      }
    }
    if (canMove) {
      $(this).animate({ left: "-=" + 1/numAcross * width + "px"},"fast");
    }
    // $(this).animate({ left: "-=" + 1/numAcross * width + "px"},
    //   "fast", function(){remove($(this))});
  });

  var validateMerge = function(fromNode, toNode){
    var num1 = fromNode.text();
    var num2 = toNode.text();
    if (num1 < 3 && num2 < 3 && num1 !== num2){
      merge(fromNode, toNode);
    } else if (num1 >= 3 && num2 >= 3 && num1 === num2) {
      merge(fromNode, toNode);
    } else {
      return false;
    }
  };

  var merge = function(fromNode, toNode) {
    var fromNum = +fromNode.text();
    var toNum = +toNode.text();
    fromNode.animate({ left: "-=" + 1/numAcross * width + "px"},  "fast", function(){
      remove(fromNode);
    });
    toNode.text(fromNum + toNum);
  };

  var remove = function(node) {
    var dancer = node.position();
    for(var i = 0; i < window.dancers.length; i++){
      var currentDancer = window.dancers[i].$node.position();
      if(dancer.left === currentDancer.left && dancer.top === currentDancer.top && node.data("dancerid") !== window.dancers[i]._id){
        // node.css({'z-index': 2});
        node.remove();
        for(var j = 0; j < window.dancers.length; j++){
          var toRemove = window.dancers[j]._id;
          if(toRemove === node.data("dancerid")){
            window.dancers.splice(j,1);
          }
        }
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
    $(this).text('Line up!');
    $(this).removeClass('dance');
    $(this).addClass('lineUp');
  });

});
