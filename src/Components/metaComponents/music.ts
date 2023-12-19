import { Scene, Vector3 } from "@babylonjs/core";
import { Sound } from "@babylonjs/core";
type configSound = {
  position: Vector3;
  distanceModal: string;
  coneAngle: number;
  volume: number;
};

/* Responsibility:
 * 1. Music playing.
 */
export class Music {
  music: Sound;
  constructor(name: string, src: string, scene: Scene) {
    this.music = new Sound(name, src, scene, null, {
      autoplay: true,
      loop: true,
      maxDistance: 100,
      spatialSound: true,
    });
  }
  soundConfig(configData: configSound) {
    this.music.setPosition(configData.position);
    this.music.distanceModel = configData.distanceModal;
    this.music.directionalConeInnerAngle = configData.coneAngle;
    this.music.setVolume(configData.volume);
  }
}
