var ScaredDancer = function(top, left, timeBetweenSteps){
  // this = Object.create(BlinkyDancer.prototype);
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('scaredDancer');
};

ScaredDancer.prototype = Object.create(Dancer.prototype);

// ScaredDancer.prototype.step = function(){
//   Dancer.prototype.step.call(this);
//   var colors = ['red','orange','yellow','green','blue','black'];
//   var randColor = colors[Math.floor(Math.random() * colors.length)];
//   // console.log(randColor);
//   // this.$node.toggle();
//   this.$node.css(
//     {color: randColor});
// };
