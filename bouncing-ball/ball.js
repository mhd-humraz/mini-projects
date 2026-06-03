class Ball {
    constructor(x, y, type = 'normal') {
        this.x = x;
        this.y = y;
        this.type = type;
        
        // Base properties that will be modified by type
        this.setPropertiesByType();
        
        // Physics properties
        this.velX = (Math.random() - 0.5) * 10;
        this.velY = (Math.random() - 0.5) * 10;
        this.dragging = false;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
        
        // Visual effects
        this.trail = [];
        this.maxTrailLength = 10;
        this.particles = [];
    }

    setPropertiesByType() {
        switch(this.type) {
            case 'normal':
                this.size = Math.random() * 20 + 15;
                this.color = this.getRandomColor();
                this.bounce = 0.8;
                this.gravity = 0.5;
                this.friction = 0.99;
                break;
                
            case 'bouncy':
                this.size = Math.random() * 15 + 10;
                this.color = '#ffdd59';
                this.bounce = 1.2;
                this.gravity = 0.3;
                this.friction = 0.95;
                break;
                
            case 'heavy':
                this.size = Math.random() * 30 + 25;
                this.color = '#485460';
                this.bounce = 0.5;
                this.gravity = 1.2;
                this.friction = 0.98;
                break;
                
            case 'bubble':
                this.size = Math.random() * 25 + 20;
                this.color = '#74b9ff';
                this.bounce = 0.3;
                this.gravity = -0.2;
                this.friction = 0.9;
                break;
                
            case 'fire':
                this.size = Math.random() * 18 + 12;
                this.color = '#ff3838';
                this.bounce = 0.7;
                this.gravity = 0.1;
                this.friction = 0.97;
                break;
        }
    }

    getRandomColor() {
        const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#f368e0', '#ff9f43'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(canvas, gravityEnabled, balls, collisionEnabled) {
        // Add current position to trail
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }

        // Apply gravity if enabled
        if (gravityEnabled) {
            this.velY += this.gravity;
        }

        // Apply friction
        this.velX *= this.friction;
        this.velY *= this.friction;

        // Update position
        this.x += this.velX;
        this.y += this.velY;

        // Handle collisions with walls
        this.handleWallCollision(canvas);

        // Handle ball collisions if enabled
        if (collisionEnabled) {
            this.handleBallCollisions(balls);
        }

        // Update particles for fire balls
        if (this.type === 'fire') {
            this.updateParticles();
        }
    }

    handleWallCollision(canvas) {
        // Right wall
        if (this.x + this.size > canvas.width) {
            this.x = canvas.width - this.size;
            this.velX = -(this.velX * this.bounce);
        }
        // Left wall
        else if (this.x - this.size < 0) {
            this.x = this.size;
            this.velX = -(this.velX * this.bounce);
        }
        // Bottom wall
        if (this.y + this.size > canvas.height) {
            this.y = canvas.height - this.size;
            this.velY = -(this.velY * this.bounce);
        }
        // Top wall
        else if (this.y - this.size < 0) {
            this.y = this.size;
            this.velY = -(this.velY * this.bounce);
        }
    }

    handleBallCollisions(balls) {
        for (let ball of balls) {
            if (ball !== this) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = this.size + ball.size;

                if (distance < minDistance) {
                    // Collision detected
                    const angle = Math.atan2(dy, dx);
                    const targetX = this.x + Math.cos(angle) * minDistance;
                    const targetY = this.y + Math.sin(angle) * minDistance;
                    
                    const ax = (targetX - ball.x) * 0.05;
                    const ay = (targetY - ball.y) * 0.05;
                    
                    this.velX -= ax;
                    this.velY -= ay;
                    ball.velX += ax;
                    ball.velY += ay;

                    // Create collision effect
                    this.createCollisionEffect(ball.x, ball.y);
                }
            }
        }
    }

    createCollisionEffect(x, y) {
        if (this.type === 'fire') {
            for (let i = 0; i < 5; i++) {
                this.particles.push({
                    x: x,
                    y: y,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 8,
                    speedY: (Math.random() - 0.5) * 8,
                    life: 1.0
                });
            }
        }
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life -= 0.02;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    draw(ctx, trailsEnabled) {
        // Draw trail if enabled
        if (trailsEnabled && this.trail.length > 1) {
            ctx.strokeStyle = this.color + '40';
            ctx.lineWidth = this.size / 2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let i = 1; i < this.trail.length; i++) {
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.stroke();
        }

        // Draw main ball
        const gradient = ctx.createRadialGradient(
            this.x - this.size/3, this.y - this.size/3, 1,
            this.x, this.y, this.size
        );
        
        switch(this.type) {
            case 'fire':
                gradient.addColorStop(0, '#ffff00');
                gradient.addColorStop(0.5, '#ff3838');
                gradient.addColorStop(1, '#b33939');
                break;
            case 'bubble':
                gradient.addColorStop(0, '#ffffff');
                gradient.addColorStop(0.7, '#74b9ff');
                gradient.addColorStop(1, '#0984e3');
                break;
            default:
                gradient.addColorStop(0, '#ffffff');
                gradient.addColorStop(0.7, this.color);
                gradient.addColorStop(1, this.darkenColor(this.color, 0.3));
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x - this.size/3, this.y - this.size/3, this.size/3, 0, Math.PI * 2);
        ctx.fill();

        // Draw particles for fire balls
        if (this.type === 'fire') {
            this.drawParticles(ctx);
        }
    }

    drawParticles(ctx) {
        for (let particle of this.particles) {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = `hsl(${Math.random() * 30 + 20}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    darkenColor(color, factor) {
        const hex = color.replace('#', '');
        const num = parseInt(hex, 16);
        const amt = Math.round(2.55 * factor * 100);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    isPointInside(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;
        return Math.sqrt(dx * dx + dy * dy) < this.size;
    }

    startDrag(x, y) {
        this.dragging = true;
        this.dragOffsetX = this.x - x;
        this.dragOffsetY = this.y - y;
        this.velX = 0;
        this.velY = 0;
    }

    drag(x, y) {
        if (this.dragging) {
            this.x = x + this.dragOffsetX;
            this.y = y + this.dragOffsetY;
        }
    }

    endDrag(x, y, velX, velY) {
        if (this.dragging) {
            this.dragging = false;
            this.velX = velX * 0.5;
            this.velY = velY * 0.5;
        }
    }
}
