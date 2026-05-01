type Props = { size?: number; color?: string; style?: React.CSSProperties };

export function PlayGlyph({ size = 12, color = "currentColor", style }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ marginLeft: -2, ...style }}
      aria-hidden
    >
      <path d="M7 4 L20 12 L7 20 Z" fill={color} />
    </svg>
  );
}
