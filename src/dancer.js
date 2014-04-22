// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){

  // use jQuery to create an HTML <span> tag
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.step();
  this.setPosition(top, left);
};

Dancer.prototype.step = function(){
  var that = this;
  setTimeout(that.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top,left){
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.lineUp = function(left){
  var styleSettings = {
    left: left
  };
  this.$node.animate(styleSettings, 'slow');
};
