import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";
import { FirstPersonControls } from "https://cdn.skypack.dev/three-stdlib/controls/FirstPersonControls";

//function for button

const removeButton = document.getElementById("removeal");
const controlaElement = document.getElementById("controla");
const controldElement = document.getElementById("controld");
const controlwElement = document.getElementById("controlw");
const controlsElement = document.getElementById("controls");
const controlshfElement = document.getElementById("controlshf");
const controlspcElement = document.getElementById("controlspc");


removeal.addEventListener("click", function() {
  controlshfElement.remove();
  controlspcElement.remove();
  controlaElement.remove();
  controldElement.remove();
  controlwElement.remove();
  controlsElement.remove();
  removeButton.remove();
});

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

// Add orbit controls
const controls = new FirstPersonControls(camera, renderer.domElement);
controls.movementSpeed = 5;
controls.lookSpeed = 0.2;
controls.lookVertical = true;
controls.constrainVertical = true;
controls.verticalMin = 1.0;
controls.verticalMax = 2.0;

let spacePressed = false;
let shiftPressed = false;

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    spacePressed = true;
  }
  if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
    shiftPressed = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    spacePressed = false;
  }
  if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
    shiftPressed = false;
  }
});




// Set up the camera position
camera.position.set(0, 3, 7);
camera.lookAt(scene.position);

// Set up the lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Create a new cube demo
const clickableCubeGeometry = new THREE.BoxGeometry(1, 1, 0.5);
const clickableCubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00A300 });
const clickableCube = new THREE.Mesh(clickableCubeGeometry, clickableCubeMaterial);
clickableCube.position.y = 1.8;
scene.add(clickableCube);

// Create a new cube download
const clickCubeGeometrs = new THREE.BoxGeometry(1, 1, 0.5);
const clickMaterials = new THREE.MeshPhongMaterial({ color: 0x0000cc });
const clickCube = new THREE.Mesh(clickCubeGeometrs, clickMaterials);
clickCube.position.y = 0.5;
scene.add(clickCube);

// Add the "CITYONE" text on top of the cube
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new THREE.TextGeometry('CITYONE', {
    font: font,
    size: 0.35,
    height: 0.06,
  });

  const textMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(-1, 2.7, 0);
  scene.add(textMesh);

  // Add the "DEMO" text on top of the cube
  const demoTextGeometry = new THREE.TextGeometry('DEMO', {
    font: font,
    size: 0.35,
    height: 0.06,
  });

  const demoTextMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const demoTextMesh = new THREE.Mesh(demoTextGeometry, demoTextMaterial);
  demoTextMesh.position.set(-2, 1.65, 0); // Adjust the position as needed
  scene.add(demoTextMesh);

  // Add the "DOWNLOAD" text on top of the cube
  const downloadTextGeometry = new THREE.TextGeometry('DOWNLOAD', {
    font: font,
    size: 0.35,
    height: 0.06,
  });

  const downloadTextMaterial = new THREE.MeshBasicMaterial({ color: 0x3333ff });
  const downloadTextMesh = new THREE.Mesh(downloadTextGeometry, downloadTextMaterial);
  downloadTextMesh.position.set(-3.5, 0.4, 0); // Adjust the position as needed
  scene.add(downloadTextMesh);
});



// Add a ground plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x032333 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Render the scene
let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  let delta = clock.getDelta();

  if (spacePressed) {
    camera.position.y += 5 * delta;
  }

  if (shiftPressed) {
    camera.position.y -= 5 * delta;
  }

  controls.update(delta);

  renderer.render(scene, camera);
}



animate();

// Add an event listener for the "wheel" event
window.addEventListener('wheel', handleScroll);

function handleScroll(event) {
  // Adjust the camera position based on the scroll direction
  const scrollAmount = event.deltaY * 0.01;
  camera.position.y += scrollAmount;

  // Clamp the camera position to a minimum and maximum height
  camera.position.y = Math.max(1, Math.min(50, camera.position.y));
}

// Add a raycaster and a mouse vector for the clickable cube
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Store the original color of the cube
const originalColor = clickableCubeMaterial.color.clone();
const originaldown = clickMaterials.color.clone();


function onMouseMove(event) {
  // Calculate the mouse position in normalized device coordinates (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const clickableCubeIntersects = raycaster.intersectObjects([clickableCube]);
  const clickCubeIntersects = raycaster.intersectObjects([clickCube]);

  let cursorChanged = false;

  if (clickableCubeIntersects.length > 0) {
    // Change the cube color to a lighter shade and the mouse cursor to a button effect
    clickableCubeMaterial.color.lerp(new THREE.Color(0x00ff00), 0.5);
    document.body.style.cursor = 'pointer';
    cursorChanged = true;
  } else {
    // Restore the original color of the cube
    clickableCubeMaterial.color.copy(originalColor);
  }

  if (clickCubeIntersects.length > 0) {
    // Change the cube color to a lighter shade and the mouse cursor to a button effect
    clickMaterials.color.lerp(new THREE.Color(0x3333ff), 0.5);
    document.body.style.cursor = 'pointer';
    cursorChanged = true;
  } else {
    // Restore the original color of the cube
    clickMaterials.color.copy(originaldown);
  }

  if (!cursorChanged) {
    document.body.style.cursor = 'default';
  }
}

// Add event listener for the "mousemove" event
window.addEventListener("mousemove", onMouseMove);

// ...



function onMouseClick(event) {
    // Calculate the mouse position in normalized device coordinates (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
  
    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([clickableCube]);
    const intersects1 = raycaster.intersectObjects([clickCube]);
  
    if (intersects.length > 0) {
      // Redirect to cityone.html if the cube was clicked
      window.location.href = "cityone.html";
    }

    if (intersects1.length > 0) {
      // Redirect to citytwo.html if the cube was clicked
      window.location.href = "cityonedownload.html";
    }
  }

  
  // Add event listeners for the click event and onMouseClick function
  window.addEventListener("click", onMouseClick);