import {
    Scene,
    UniversalCamera,
    Vector3,
    TransformNode,
    AbstractMesh,
  } from "@babylonjs/core";
  
  export class CameraManager {
    camera = {} as UniversalCamera;
    scene = {} as Scene;
    constructor(scene: Scene) {
      this.scene = scene;
      this.createCam();
    }
    createCam() {
      this.camera = new UniversalCamera("cam", new Vector3(0, 10, 0), this.scene);
      this.camera.angularSensibility = 3200;
      this.camera.minZ = 0.3;
      this.camera.attachControl();
      // this.camera.inputs.attached.mouse.detachControl();
      this.camera.attachControl()
      // this.camera.inputs.attached.keyboard.detachControl();
      this.scene.activeCamera = this.camera;
    }
    connectWithUser(transformNode: TransformNode) {
      this.camera.parent = transformNode;
      this.camera.position.y = 1.8;
      this.camera.rotation.y = Math.PI;
    }
    lookAt(mesh: AbstractMesh | undefined) {
      if (mesh) this.camera.setTarget(mesh.absolutePosition);
    }


  }
  