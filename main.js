var canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var particles = [];
var numParticles = 400;
var gasTemp = 200;
var particleSize = 1;
var particleColor = "#ffffff";
var gasDensity = 0.05;
var gasViscosity = 0.1;
var mouseForce = 0.1;

var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
};

canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

function Particle(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = particleSize;
    this.color = particleColor;
}

for (var i = 0; i < numParticles; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var vx = Math.random() * 10 - 5;
    var vy = Math.random() * 10 - 5;
    particles.push(new Particle(x, y, vx, vy));
}

function updateParticles() {
    for (var i = 0; i < numParticles; i++) {
        var p = particles[i];

        // Apply force based on the mouse position
        var dx = mouse.x - p.x;
        var dy = mouse.y - p.y;
        p.vx += dx * mouseForce;
        p.vy += dy * mouseForce;

        p.x += p.vx;
        p.y += p.vy;

        // Apply gas viscosity to particle velocity
        p.vx *= (1 - gasViscosity);
        p.vy *= (1 - gasViscosity);
    }
}

function renderParticles() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < numParticles; i++) {
        var p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    }
}

function loop() {
    updateParticles();
    renderParticles();
    requestAnimationFrame(loop);
}

loop();
