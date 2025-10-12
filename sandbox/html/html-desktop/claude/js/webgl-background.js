class WebGLBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        
        this.init();
        this.animate();
        this.setupMouseTracking();
    }

    init() {
        const canvas = document.getElementById('webgl-background');
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a0a0a, 1);

        this.createParticleSystem();
        this.createGeometricShapes();
        
        this.camera.position.z = 50;

        window.addEventListener('resize', () => this.onWindowResize());
    }

    createParticleSystem() {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 200;
            positions[i3 + 1] = (Math.random() - 0.5) * 200;
            positions[i3 + 2] = (Math.random() - 0.5) * 200;
            
            velocities[i3] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
            velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.PointsMaterial({
            color: 0x0088ff,
            size: 1,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createGeometricShapes() {
        const shapes = [];
        
        for (let i = 0; i < 10; i++) {
            let geometry, material, mesh;
            
            const shapeType = Math.floor(Math.random() * 3);
            
            switch (shapeType) {
                case 0:
                    geometry = new THREE.BoxGeometry(1, 1, 1);
                    break;
                case 1:
                    geometry = new THREE.SphereGeometry(0.5, 8, 8);
                    break;
                case 2:
                    geometry = new THREE.OctahedronGeometry(0.7);
                    break;
            }
            
            material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            
            mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            
            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                driftSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                }
            };
            
            shapes.push(mesh);
            this.scene.add(mesh);
        }
        
        this.shapes = shapes;
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.time += 0.01;
        
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            const velocities = this.particles.geometry.attributes.velocity.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];
                
                if (Math.abs(positions[i]) > 100) velocities[i] *= -1;
                if (Math.abs(positions[i + 1]) > 100) velocities[i + 1] *= -1;
                if (Math.abs(positions[i + 2]) > 100) velocities[i + 2] *= -1;
                
                const mouseInfluence = 5;
                const dx = this.mouse.x * 50 - positions[i];
                const dy = this.mouse.y * 50 - positions[i + 1];
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 20) {
                    velocities[i] += dx * 0.0001 * mouseInfluence;
                    velocities[i + 1] += dy * 0.0001 * mouseInfluence;
                }
            }
            
            this.particles.geometry.attributes.position.needsUpdate = true;
            this.particles.rotation.y += 0.002;
        }
        
        if (this.shapes) {
            this.shapes.forEach(shape => {
                shape.rotation.x += shape.userData.rotationSpeed.x;
                shape.rotation.y += shape.userData.rotationSpeed.y;
                shape.rotation.z += shape.userData.rotationSpeed.z;
                
                shape.position.x += shape.userData.driftSpeed.x;
                shape.position.y += shape.userData.driftSpeed.y;
                shape.position.z += shape.userData.driftSpeed.z;
                
                if (Math.abs(shape.position.x) > 50) shape.userData.driftSpeed.x *= -1;
                if (Math.abs(shape.position.y) > 50) shape.userData.driftSpeed.y *= -1;
                if (Math.abs(shape.position.z) > 50) shape.userData.driftSpeed.z *= -1;
                
                const pulseIntensity = Math.sin(this.time * 2 + shape.position.x * 0.1) * 0.2 + 0.8;
                shape.material.opacity = 0.2 + pulseIntensity * 0.2;
            });
        }
        
        this.camera.position.x += (this.mouse.x * 10 - this.camera.position.x) * 0.02;
        this.camera.position.y += (-this.mouse.y * 10 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}