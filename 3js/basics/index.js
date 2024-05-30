import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/Addons.js";
let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Cursor event listener
 *
 */

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.width - 0.5;
});

/**
 * WE need 4 element to create scene
 * - A scene that will content object
 * - some objects
 * - a camera
 * - a renderer
 */

/**
 * 1. Scene
 */

const scene = new THREE.Scene();

/**
 * 2. Some objects
 * Primitive objects
 * Imported models
 * Lights
 * Particles
 * Etc...
 */

// Red Cube

// const geometry = new THREE.BoxGeometry(1, 1, 1,2,2,2);

// const geometry = new THREE.Geometry() // Deprecated and also removed
/* const geometry = new THREE.BufferGeometry()
const points = []
const point = new THREE.Vector3()
for ( let i = 0; i < 100; i ++ ) {

    point.random();
    points.push( point.x, point.y, point.z );

}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3)) */
 
// Alternate way of doing this
/* const geometry = new THREE.BufferGeometry()

const positionArray= new Float32Array([
    0,0,0,
    0,1,0,
    1,0,0
])

const positionAttribute =  new THREE.BufferAttribute(positionArray, 3)

geometry.setAttribute('position', positionAttribute) */


 

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 , wireframe:true});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

/* 
const group = new THREE.Group()

scene.add(group)

group.add(mesh)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x00ff00})
)
cube1.position.x=2
group.add(cube1)


const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x0000ff})
)
group.add(cube2)
cube2.position.x=-2


group.position.set(-2,1,-1)
group.rotation.set(-1,1,1)
group.scale.set(1,3,1) */

// Viewport

// Add camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// @ts-ignore
const controls = new OrbitControls(camera, document.querySelector(".webGL"));
controls.enableDamping = true;
/* controls.target.y=2
controls.update() */
// Renderer
const renderer = new THREE.WebGLRenderer({
  // @ts-ignore
  canvas: document.querySelector(".webGL"),
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  sizes.weight = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.render(scene, camera);
});


window.addEventListener('dblclick', ()=>{
    if(!document.fullscreenElement){
        document.querySelector('webGL')?.requestFullscreen()
    }else{

    }
})

// with time
// let time = Date.now()

// with clock
// const clock = new THREE.Clock()

// gsap.to(mesh.position,{x:2, delay:1 , duration:2})

const tick = () => {
  // calculate time
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time
  // time = deltaTime;

  // with clocl
  // const elapsedTime = clock.getElapsedTime()

  // // update object
  // mesh.position.y = Math.sin(elapsedTime)
  // mesh.position.x = Math.cos(elapsedTime)

  // mesh.rotation.y = Math.sin(elapsedTime)
  // mesh.rotation.x = Math.cos(elapsedTime)

  // update camera

  /*  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5

    camera.lookAt(mesh.position) */

  // Control Damping
  //   controls.update();

  // Render
  renderer.render(scene, camera);

  // request animation frame
  window.requestAnimationFrame(tick);
};

tick();
