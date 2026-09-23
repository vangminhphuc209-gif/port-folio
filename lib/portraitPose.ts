export type PortraitPose =
  | "idle"
  | "look-left"
  | "look-right"
  | "lean-left"
  | "arms-crossed"
  | "point-right";

export const PORTRAIT_POSE_EVENT = "portfolio:portrait-pose";

export function setPortraitPose(pose: PortraitPose | null) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(PORTRAIT_POSE_EVENT, {
      detail: { pose },
    }),
  );
}
