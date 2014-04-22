var ColorDancer = function(top, left, timeBetweenSteps){
  // this = Object.create(BlinkyDancer.prototype);
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('colorDancer');
};

ColorDancer.prototype = Object.create(Dancer.prototype);

ColorDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  var colors = ['red','orange','yellow','green','blue','black'];
  var randColor = colors[Math.floor(Math.random() * colors.length)];
  this.$node.css({color: randColor});
};
