import {
  // AbstractMesh,
  Color3,
  ICrowd,
  Mesh,
  RecastJSPlugin,
  StandardMaterial,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import Recast from "recast-detour";
import { metaGlobal } from "../metaGlobal";
export class NavMeshManager {
  parameters = {
    cs: 0.2,
    ch: 0.2,
    walkableSlopeAngle: 35,
    walkableHeight: 1,
    walkableClimb: 1,
    walkableRadius: 4,
    maxEdgeLen: 12,
    maxSimplificationError: 1.3,
    minRegionArea: 8,
    mergeRegionArea: 20,
    maxVertsPerPoly: 6,
    detailSampleDist: 6,
    detailSampleMaxError: 1,
  };
  agentParams = {
    radius: 0.1,
    height: 0.2,
    maxAcceleration: 110.0,
    maxSpeed: 4.0,
    collisionQueryRange: 0.5,
    pathOptimizationRange: 0.0,
    separationWeight: 1.0,
  };
  crowd = {} as ICrowd;
  navigationPlugin = {} as RecastJSPlugin;

  async init() {
    const recastist = await this.importRecastAlgorithm();
    console.log(recastist, "Recast");
    this.navigationPlugin = new RecastJSPlugin(recastist);
  }
  async importRecastAlgorithm() {
    return await Recast();
  }
  createNavMesh(meshes: Mesh[]) {
    this.navigationPlugin.createNavMesh(meshes, this.parameters);
  }
  createCrowd() {
    this.crowd = this.navigationPlugin.createCrowd(10, 3, metaGlobal.scene);
  }
  addAgent(position: Vector3, transformNode: TransformNode): number {
    return this.crowd.addAgent(position, this.agentParams, transformNode);
  }
  moveAgent(agentIndex: number, destination: Vector3) {
    this.crowd.agentGoto(
      agentIndex,
      this.navigationPlugin.getClosestPoint(destination)
    );
  }
  changeAgentSpeed(agentIndex: number, speed: number) {
    this.crowd.updateAgentParameters(agentIndex, {
      ...this.agentParams,
      maxSpeed: speed,
    });
  }
  temporaryTeleport(agentIndex: number, destination: Vector3) {
    this.crowd.agentTeleport(agentIndex, destination);
  }
  // DEBUG PURPOSES ONLY //
  createDebugNavMesh() {
    const navmeshdebug = this.navigationPlugin.createDebugNavMesh(
      metaGlobal.scene
    );
    const matdebug = new StandardMaterial("matdebug", metaGlobal.scene);
    matdebug.diffuseColor = new Color3(0.1, 0.2, 1);
    matdebug.alpha = 0.2;
    navmeshdebug.material = matdebug;
  }
}
