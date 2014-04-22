var BlinkyDancer = function(top, left, timeBetweenSteps){
  // this = Object.create(BlinkyDancer.prototype);
  Dancer.call(this, top, left, timeBetweenSteps);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);

BlinkyDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  this.$node.toggle();
};
