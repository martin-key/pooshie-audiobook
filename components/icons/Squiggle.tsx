type Props = {
  width?: number;
  color?: string;
  style?: React.CSSProperties;
  strokeWidth?: number;
};

export function Squiggle({ width = 220, color = "#21A1C4", style, strokeWidth = 3 }: Props) {
  return (
    <svg
      width={width}
      height={14}
      viewBox="0 0 220 14"
      style={style}
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        d="M2 8 Q 27 -2, 55 8 T 110 8 T 165 8 T 218 8"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
