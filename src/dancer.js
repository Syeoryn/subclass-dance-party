// Creates and returns a new dancer object that can step

var Dancer = function(top, left, timeBetweenSteps){

  this._id = Dancer.prototype._nextId++;

  this.$node = $('<span class="dancer" data-dancerId=' + this._id + '></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.step();
  this.setPosition(top, left);
};

Dancer.prototype.step = function(){
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top,left){
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.removePosition = function(top,left){

}

Dancer.prototype.move = function(left){
  var styleSettings = {
    left: left
  };
  this.$node.animate(styleSettings, 'slow');
};

Dancer.prototype._nextId = 1;
