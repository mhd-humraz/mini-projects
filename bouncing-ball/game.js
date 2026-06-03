class BouncingBallsGame {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.balls = [];
        this.selectedBallType = 'normal';
        
        // Game state
        this.gravityEnabled = true;
        this.trailsEnabled = false;
        this.collisionsEnabled = true;
        
        // Mouse state
        this.mouse = {
            x: 0,
            y: 0,
            down: false,
            dragStart: null,
            draggedBall: null
        };

        // Performance tracking
        this.fps = 0;
        this.frameCount = 0;
        this.lastTime = performance.now();

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.setupEventListeners();
        this.animate();
        
        // Add some initial balls
        this.addInitialBalls();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = Math.min(window.innerHeight - 300, 600);
    }

    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => this.resizeCanvas());

        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Control buttons
        document.getElementById('addBall').addEventListener('click', () => this.addRandomBall());
        document.getElementById('clearBalls').addEventListener('click', () => this.clearBalls());
        document.getElementById('gravityToggle').addEventListener('click', () => this.toggleGravity());
        document.getElementById('trailsToggle').addEventListener('click', () => this.toggleTrails());
        document.getElementById('collisionToggle').addEventListener('click', () => this.toggleCollisions());

        // Ball type buttons
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectBallType(e.target.dataset.type));
        });

        // Click to add ball
        this.canvas.addEventListener('click', (e) => {
            if (!this.mouse.draggedBall) {
                this.addBallAtPosition(e.clientX, e.clientY);
            }
        });
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.mouse.down = true;
        this.mouse.dragStart = { x, y, time: Date.now() };
        this.mouse.draggedBall = null;

        // Check if clicked on a ball
        for (let i = this.balls.length - 1; i >= 0; i--) {
            if (this.balls[i].isPointInside(x, y)) {
                this.mouse.draggedBall = this.balls[i];
                this.mouse.draggedBall.startDrag(x, y);
                break;
            }
        }
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;

        if (this.mouse.down && this.mouse.draggedBall) {
            this.mouse.draggedBall.drag(this.mouse.x, this.mouse.y);
        }
    }

    handleMouseUp(e) {
        if (this.mouse.down && this.mouse.draggedBall) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const dragTime = Date.now() - this.mouse.dragStart.time;
            const velX = (x - this.mouse.dragStart.x) / dragTime * 100;
            const velY = (y - this.mouse.dragStart.y) / dragTime * 100;
            
            this.mouse.draggedBall.endDrag(x, y, velX, velY);
        }
        
        this.mouse.down = false;
        this.mouse.draggedBall = null;
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        this.mouse.down = true;
        this.mouse.dragStart = { x, y, time: Date.now() };
        this.mouse.draggedBall = null;

        for (let i = this.balls.length - 1; i >= 0; i--) {
            if (this.balls[i].isPointInside(x, y)) {
                this.mouse.draggedBall = this.balls[i];
                this.mouse.draggedBall.startDrag(x, y);
                break;
            }
        }
    }

    handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = touch.clientX - rect.left;
        this.mouse.y = touch.clientY - rect.top;

        if (this.mouse.down && this.mouse.draggedBall) {
            this.mouse.draggedBall.drag(this.mouse.x, this.mouse.y);
        }
    }

    handleTouchEnd(e) {
        e.preventDefault();
        if (this.mouse.down && this.mouse.draggedBall) {
            const touch = e.changedTouches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            const dragTime = Date.now() - this.mouse.dragStart.time;
            const velX = (x - this.mouse.dragStart.x) / dragTime * 100;
            const velY = (y - this.mouse.dragStart.y) / dragTime * 100;
            
            this.mouse.draggedBall.endDrag(x, y, velX, velY);
        }
        
        this.mouse.down = false;
        this.mouse.draggedBall = null;
    }

    addInitialBalls() {
        for (let i = 0; i < 5; i++) {
            this.addRandomBall();
        }
    }

    addRandomBall() {
        const x = Math.random() * (this.canvas.width - 60) + 30;
        const y = Math.random() * (this.canvas.height - 60) + 30;
        
        const types = ['normal', 'bouncy', 'heavy', 'bubble', 'fire'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        this.balls.push(new Ball(x, y, type));
        this.updateStats();
    }

    addBallAtPosition(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        this.balls.push(new Ball(x, y, this.selectedBallType));
        this.updateStats();
    }

    clearBalls() {
        this.balls = [];
        this.updateStats();
    }

    toggleGravity() {
        this.gravityEnabled = !this.gravityEnabled;
        document.getElementById('gravityToggle').textContent = 
            `Gravity: ${this.gravityEnabled ? 'ON' : 'OFF'}`;
    }

    toggleTrails() {
        this.trailsEnabled = !this.trailsEnabled;
        document.getElementById('trailsToggle').textContent = 
            `Trails: ${this.trailsEnabled ? 'ON' : 'OFF'}`;
    }

    toggleCollisions() {
        this.collisionsEnabled = !this.collisionsEnabled;
        document.getElementById('collisionToggle').textContent = 
            `Collisions: ${this.collisionsEnabled ? 'ON' : 'OFF'}`;
    }

    selectBallType(type) {
        this.selectedBallType = type;
        
        // Update UI
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });
    }

    updateStats() {
        document.getElementById('ballCount').textContent = this.balls.length;
    }

    updateFPS() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            document.getElementById('fpsCounter').textContent = this.fps;
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw balls
        this.balls.forEach(ball => {
            ball.update(this.canvas, this.gravityEnabled, this.balls, this.collisionsEnabled);
            ball.draw(this.ctx, this.trailsEnabled);
        });
        
        this.updateFPS();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the game when the page loads
window.addEventListener('load', () => {
    new BouncingBallsGame();
});
