let canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let c = canvas.getContext("2d")
let ax = window.innerWidth
let ay = window.innerHeight

document.addEventListener('resize', function () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  newsize()
})
//balls position
let mouse = {
  x: undefined,
  y: undefined,
}
document.addEventListener("mousedown", function (e) {
  mouse.x = e.x
  mouse.y = e.y
  console.log(mouse)
})
let colors = [
  '#fb2f0ae5',
  '#0ea6e4d3',
  '#C7CCD9',
  '#0CF25D',
  '#91F2E9',
  '#D96941',
]
//draw ball
class Ball {
  constructor(x, y, r, dx, dy) {
    this.x = x
    this.y = y
    this.r = r
    this.dx = dx
    this.dy = dy
    this.ms = r
    this.color = colors[Math.floor(Math.random() *colors.length)]
  }
  drawball() {
    c.beginPath()
    c.fillStyle = this.color
    c.arc(this.x, this.y, this.r, 0, Math.PI*2)
    c.stroke()
    c.fill()
  }
  update() {
    if (this.x+this.r > ax || this.x-this.r < 0) {
      this.dx=-this.dx
    }
    if (this.y+this.r > ay || this.y-this.r < 0) {
      this.dy=-this.dy
    }
    this.x += this.dx
    this.y += this.dy
    if (this.x -mouse.x < 50 && this.x - mouse.x>-50 && this.y -mouse.y < 50 && this.y - mouse.y>-50) {
      if (this.r < 40) {
        this.r += 1
      }
    } else if (this.r > this.ms) {
      this.r -= 1
    }
    this.drawball()
  }
}
let arr = []
let nb;
if (window.screen.width < 380) {
  nb = 1000
} else {
  nb = 2000;
}

for (i = 0; i < nb; i++) {
  let rx = Math.random() * window.innerWidth
  if (rx < 3) {
    rx += 3
  }
  let ry = Math.random() * window.innerHeight
  if (ry < 3) {
    ry += 3
  }
  let mx = Math.random() *7
  let my = Math.random() *7
  let radius = Math.ceil(Math.random() * 3)
  arr.push(new Ball(rx, ry, radius, mx, my))
}
function newsize() {
  arr = []
  let nb;
  if (window.screen.width < 380) {
    nb = 2000
  } else {
    nb = 3000;
  }
  for (i = 0; i < nb; i++) {
    let rx = Math.random() * window.innerWidth
    if (rx < 3) {
      rx += 3
    }
    let ry = Math.random() * window.innerHeight
    if (ry < 3) {
      ry += 3
    }
    mx = Math.random() *5
    my = Math.random() *5
    radius = Math.ceil(Math.random() * 3)
    arr.push(new Ball(rx, ry, radius, mx, my))
  }
}
newsize()
function draw() {
  requestAnimationFrame(draw)
  c.clearRect(0, 0, ax, ay)
  for (i = 0; i < arr.length; i++) {
    arr[i].update()
  }
}
draw ();