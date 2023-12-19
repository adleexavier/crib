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
    this.camera = new UniversalCamera(
      "cam",
      new Vector3(-7.25, 4.02, -16.3),
      this.scene
    );
    this.camera.angularSensibility = 3200;
    this.camera.minZ = 0.3;
    this.camera.attachControl();
    // this.camera.inputs.attached.mouse.detachControl();
    this.camera.attachControl();
    this.camera.speed = 0.8;
    this.camera.applyGravity = true;
    this.camera.checkCollisions = true;
    this.camera.ellipsoid = new Vector3(1, 2, 1);
    // this.camera.inputs.attached.keyboard.detachControl();
    this.scene.activeCamera = this.camera;
  }
  connectWithUser(transformNode: TransformNode) {
    this.camera.parent = transformNode;
    this.camera.position.y = 1;
    this.camera.rotation.y = Math.PI;
  }
  lookAt(mesh: AbstractMesh | undefined) {
    if (mesh) this.camera.setTarget(mesh.absolutePosition);
  }
}
