type Props = {
  w?: number;
  h?: number;
  opacity?: number;
  style?: React.CSSProperties;
};

export function SoftCloud({ w = 240, h = 100, opacity = 0.9, style }: Props) {
  const id = `cg-${w}-${h}`;
  return (
    <svg width={w} height={h} viewBox="0 0 240 100" style={style} aria-hidden>
      <defs>
        <radialGradient id={id} cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="55" rx="110" ry="38" fill={`url(#${id})`} opacity={opacity} />
      <ellipse cx="80" cy="50" rx="40" ry="30" fill={`url(#${id})`} opacity={opacity} />
      <ellipse cx="170" cy="45" rx="46" ry="32" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}
