import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";
import { OrbitControls } from "https://cdn.skypack.dev/three-stdlib/controls/OrbitControls";

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.update();

// Set up the camera position
camera.position.set(5, 3, 5);
camera.lookAt(scene.position);

// Set up the lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Create a simple box as a building placeholder
const geometry = new THREE.BoxGeometry(1, 3, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const building = new THREE.Mesh(geometry, material);
scene.add(building);

// Add a ground plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Add a neon plane
const neonGeometry = new THREE.PlaneGeometry(4, 1);
const neonMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
const neonPlane = new THREE.Mesh(neonGeometry, neonMaterial);
neonPlane.position.set(2, 1.5, 0);
scene.add(neonPlane);

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Add an event listener for the "wheel" event
window.addEventListener('wheel', handleScroll);

function handleScroll(event) {
  // Adjust the camera position based on the scroll direction
  const scrollAmount = event.deltaY > 0 ? 0.5 : -0.5;
  camera.position.y += scrollAmount;

  // Clamp the camera position to a minimum and maximum height
  camera.position.y = Math.max(1, Math.min(50, camera.position.y));
}
