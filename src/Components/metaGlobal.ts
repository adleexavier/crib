import { Engine, Scene } from "@babylonjs/core";
// import { NavMeshManager } from "./metaComponents/navMesh";
import { CameraManager } from "./metaComponents/camera";

export const metaGlobal = {
  scene: {} as Scene,
  engine: {} as Engine,
  camManager: {} as CameraManager,
};
export const setScene = (scene: Scene) => {
  metaGlobal.scene = scene;
  setEngine(scene);
};
export const setCamManager = (camManager: CameraManager) => {
  metaGlobal.camManager = camManager;
};
export const setEngine = (scene: Scene) => {
  metaGlobal.engine = scene.getEngine();
};
// export const setNavManager = (navMng: NavMeshManager) => {
//   metaGlobal.navMeshManager = navMng;
// };
