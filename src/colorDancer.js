var ColorDancer = function(top, left, timeBetweenSteps){
  // this = Object.create(BlinkyDancer.prototype);
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('colorDancer');
  this.$node.text(1);
  console.log(this._nextId);
};

ColorDancer.prototype = Object.create(Dancer.prototype);
ColorDancer.prototype.constructor = ColorDancer;

ColorDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  // var colors = ['red','orange','yellow','green','blue','black'];
  // var randColor = colors[Math.floor(Math.random() * colors.length)];
  // this.$node.css({'background-color': randColor});
};
