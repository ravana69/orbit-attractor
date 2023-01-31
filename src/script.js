class Point{
  constructor(){
    this.x = random(width);
    this.y = random(height);
    this.m = random() < .5 ? 1 : -1;
    this.hue = random(.5, .8);
  }
  update(){
    this.prevX = this.x;
    this.prevY = this.y;
    
    let a = atan2(this.y-this.p.y, this.x-this.p.x);
    let d = dist(this.x, this.y, this.p.x, this.p.y);
    
    a += .001*this.m;
    d = max(d-1, 0);
    
    this.x = this.p.x + cos(a)*d;
    this.y = this.p.y + sin(a)*d;
  }
  render(){
    // ellipse(this.x, this.y, 3);
    stroke(this.hue, 1, 1, .05);
    line(this.x, this.y, this.prevX, this.prevY);
  }
}

function setup (){
  pixelDensity(1);
  createCanvas();
  colorMode(HSB, 1, 1, 1);
  windowResized();
}

let points;
let init = () => {
  points = [];
  for (let i = 0; i < 500; i++){
    points.push(new Point());
  }
  for (let i = 0; i < points.length; i++){
    points[i].p = points[(i+1)%points.length];
  }
  
  blendMode(BLEND);
  background(0);
}

function draw(){
  blendMode(ADD);
  for(let i = 0; i < 10; i++){
    points.forEach(p => {
      p.update();
      p.render();
    })
  }
}

function mousePressed(){init();}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  init();
}