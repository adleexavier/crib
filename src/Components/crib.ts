/******************************* */
import {
    Scene,
    Engine,
    SceneLoader,
    HemisphericLight,
    Vector3,
    UniversalCamera,
    Mesh,
  } from "@babylonjs/core";
  import "@babylonjs/loaders";
 
  import {
    setScene,
    setNavManager,
    setCamManager,
  } from "./metaGlobal";

import { Music } from "./metaComponents/music";
import { NavMeshManager } from "./metaComponents/navMesh";
import { CameraManager } from "./metaComponents/camera";
  export class myCrib {
    scene: Scene;
    engine: Engine;
    camera!: UniversalCamera;
    cameraManager = {} as CameraManager;
    navMeshManager = {} as NavMeshManager;
  
    //*********CONSTRUCTOR************/
    constructor(
      private canvas: HTMLCanvasElement,

    ) {
      this.engine = new Engine(this.canvas, true)
      this.scene = this.createScene();
      this.scene.gravity = new Vector3(0,-9.81/30,0);
      this.scene.collisionsEnabled = true;
      setScene(this.scene);
      this.cloneConstructor();
    }
  
    async cloneConstructor() {
      await this.createEnvironment();
      /********************************** */
      this.cameraManager = new CameraManager(this.scene);
      setCamManager(this.cameraManager);
  
      this.engine.runRenderLoop(() => {
        this.scene.render();
      });
    }
    createScene(): Scene {
      const scene = new Scene(this.engine);
      // Add lights
      const hemiLight = new HemisphericLight(
        "hemiLight",
        new Vector3(0, 1, 0),
        this.scene
      );
      hemiLight.intensity = 1;
  
      this.canvas.addEventListener("contextmenu", (e) => {
        this.engine.enterPointerlock();
      });
      this.canvas.addEventListener("dblclick", (e) => {
        this.engine.exitPointerlock();
      });
  

      const cribMusic = new Music(
        "crib",
        "/Audio/music.mp3",
        this.scene
      );
      /*
       * set music configuration
       */
      cribMusic.soundConfig({
        position: new Vector3(42, 2,44.4),
        distanceModal: "exponential",
        coneAngle: Math.PI / 2,
        volume: 0.1,
      });
  
      return scene;
    }
  
    async createEnvironment(): Promise<void> {
      this.engine.displayLoadingUI();
  
      const { meshes } = await SceneLoader.ImportMeshAsync(
        "",
        "/models/",
        `crib2.glb`,
        this.scene
      );
      meshes.map(mesh=>{
       if (mesh.name.startsWith("floor"))
       mesh.checkCollisions = true
      })
      const navMeshes = meshes.slice(1) as Mesh[];
      // this.navMeshManager = new NavMeshManager();
      // await this.navMeshManager.init();
      // setNavManager(this.navMeshManager);
      // this.navMeshManager.createNavMesh(navMeshes);
      // this.navMeshManager.createCrowd();
      // meshes.map((mesh) => {
      //   mesh.checkCollisions = false;
      //   mesh.isPickable = false;
      //   mesh.freezeWorldMatrix();
      //   mesh.material?.freeze();
      // });
      this.engine.hideLoadingUI();
    }

  
  
  
    terminateMetaverse() {
      this.engine.dispose();
      this.scene.dispose();
      this.engine = {} as Engine;
      this.scene = {} as Scene;
    }
  }
  