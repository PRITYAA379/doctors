// Three.js setup for 3D Ashok Chakra
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 200, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-canvas'), alpha: true });
renderer.setSize(window.innerWidth, 200);

// Create Ashok Chakra (24 spokes as cylinders)
const chakraGroup = new THREE.Group();
const spokeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
const spokeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
for (let i = 0; i < 24; i++) {
    const spoke = new THREE.Mesh(spokeGeometry, spokeMaterial);
    const angle = (i / 24) * Math.PI * 2;
    spoke.rotation.z = Math.PI / 2;
    spoke.position.set(Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0);
    chakraGroup.add(spoke);
}

// Central hub
const hubGeometry = new THREE.CircleGeometry(0.3, 32);
const hubMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
const hub = new THREE.Mesh(hubGeometry, hubMaterial);
chakraGroup.add(hub);

scene.add(chakraGroup);
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    chakraGroup.rotation.z += 0.01;
    renderer.render(scene, camera);
}
animate();

// Responsive canvas resizing
window.addEventListener('resize', () => {
    const canvas = document.getElementById('threejs-canvas');
    renderer.setSize(canvas.clientWidth, 200);
    camera.aspect = canvas.clientWidth / 200;
    camera.updateProjectionMatrix();
});

// Click tracking for analytics
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const linkText = e.target.textContent;
        console.log(`Clicked: ${linkText}`);
    });
});

// Button animation on page load
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(10px)';
        setTimeout(() => {
            btn.style.transition = 'all 0.3s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
