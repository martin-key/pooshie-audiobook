type Props = {
  children: React.ReactNode;
  color?: string;
  bg?: string;
  style?: React.CSSProperties;
};

export function Pill({ children, color = "#E0195B", bg = "#FCE4EC", style }: Props) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-ui)",
        fontWeight: 600,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color,
        background: bg,
        padding: "8px 16px",
        borderRadius: 999,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
