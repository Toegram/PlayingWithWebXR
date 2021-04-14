import * as THREE from "../../libs/three/three.module.js";
import { OrbitControls } from "../../libs/three/jsm/OrbitControls.js";

class App {
  constructor() {
    const container = document.createElement("div");
    document.body.appendChild(container);

    //The minimum any ThreeJS app require is:
    //1. Camera
    //2. Scene
    //3. Renderer (usually WebGL Renderer)

    //---CAMERA---//
    //Perspective Camera allows distant objects to appear smaller than closer objects
    //Parms: FOV in degrees, Aspect Ratio, Near Value, Far Value
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    //Sets init value of camera to "straight ahead, about 4 meters away"
    //East, Up, South
    this.camera.position.set(0, 0, 4);

    //---SCENE---//
    //No parms by default paints the canvas white
    //Changes background color using ThreeJS built ins
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x2e1a47);

    //-Light-//
    const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
    this.scene.add(ambient);
    const light = new THREE.DirectionalLight();
    light.position.set(0.2, 1, 1);
    this.scene.add(light);

    //---RENDERER---//
    //uses ThreeJSs built in WebGL Renderer, and sets antialiasing on to help with jagged edges
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    //Prevents blurring by basing pixel ration on specific device
    this.renderer.setPixelRatio(window.devicePixelRatio);
    //Size of the whole window because why not
    container.appendChild(this.renderer.domElement);

    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    //Called 60x/second
    this.renderer.setAnimationLoop(this.render.bind(this));

    //Objects in the scene are referred to as a Mesh and take two parms, geometry and a material
    const geometry = new THREE.BoxBufferGeometry();
    const material = new THREE.MeshStandardMaterial({ color: "blue" });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.mesh.rotateY(0.009);
    this.renderer.render(this.scene, this.camera);
  }
}

export { App };
