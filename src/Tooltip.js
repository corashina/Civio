class Tooltip { constructor(message) { this.constructor(message) } }

Tooltip.prototype.constructor = function (message) {

  var fontface = "Arial";
  var fontsize = 18;
  var borderThickness = 4;

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.font = "Bold " + fontsize + "px " + fontface;

  var textWidth = context.measureText(message).width;

  // context.fillStyle = "rgba(255,255,255,1.0)";
  // context.strokeStyle = "rgba(0,0,0,1.0)";
  // context.lineWidth = borderThickness;

  var msg = message.split('\n');
  // this.roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness * 2, fontsize * msg.length * 1.2 + borderThickness, 6);

  context.fillStyle = "rgba(0, 0, 0, 1.0)";

  for (var i = 0; i < msg.length; i++) {
    context.fillText(msg[i], borderThickness * 2, fontsize * (i + 1) + borderThickness);
  }

  var texture = new THREE.Texture(canvas)
  texture.needsUpdate = true;
  var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  var sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(100, 50, 1.0);

  this.mesh = sprite;

}

Tooltip.prototype.roundRect = function (ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

export default Tooltip;