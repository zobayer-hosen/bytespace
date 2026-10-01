/** Shading ramps that give the flat SVG shapes their glossy 3D look. */
export const shapePalettes = {
  lime: {
    highlight: "#F6FFB8",
    light: "#E6FF5A",
    base: "#D4F531",
    shade: "#B2D11A",
    deep: "#8CA80A",
  },
  white: {
    highlight: "#FFFFFF",
    light: "#FFFFFF",
    base: "#EEF1F8",
    shade: "#CCD3E4",
    deep: "#A9B3CC",
  },
} as const;

export type ShapeTone = keyof typeof shapePalettes;

export type ShapeProps = {
  tone?: ShapeTone;
  className?: string;
};
