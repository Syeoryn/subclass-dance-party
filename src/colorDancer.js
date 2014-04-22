var ColorDancer = function(top, left, timeBetweenSteps){
  // this = Object.create(BlinkyDancer.prototype);
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('colorDancer');
};

ColorDancer.prototype = Object.create(Dancer.prototype);

ColorDancer.prototype.step = function(){
  Dancer.prototype.step.call(this);
  // this.$node.toggle();

  // this.$node.css(
  //   border:
  //   );
  var colors = ['red','orange','yellow','green','blue','black'];
  this.$node.css('border','50x solid ' + colors[Math.floor(Math.random() * colors.length)]);
};
