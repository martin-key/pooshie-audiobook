import Image from "next/image";

export function HeroPortraitStack() {
  return (
    <div className="portrait-stack" style={{ position: "relative", maxWidth: 480, margin: "0 0 0 auto" }}>
      {/* main portrait */}
      <div
        className="stamp-frame"
        style={{
          transform: "rotate(2deg)",
          animation: "float-y 8s ease-in-out infinite",
          aspectRatio: "4 / 5",
        }}
      >
        <Image
          src="/images/pooshie-portrait.jpeg"
          alt="Pooshie the pink hedgehog — watercolor portrait"
          fill
          priority
          sizes="(max-width: 880px) 90vw, 480px"
          style={{ objectFit: "contain", borderRadius: 38 }}
        />
      </div>

      {/* spinning "Free chapter" stamp */}
      <div
        className="portrait-stamp"
        style={{
          position: "absolute",
          top: -28,
          right: -28,
          width: 124,
          height: 124,
          borderRadius: "50%",
          background: "#FBC85A",
          color: "#5a4a2c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 14px 30px rgba(232,184,75,0.45)",
          animation: "spin-slow 22s linear infinite",
        }}
        aria-hidden
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <path
              id="circle-path"
              d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            />
          </defs>
          <text
            fill="#5a4a2c"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            <textPath href="#circle-path">
              free chapter · listen now · free chapter ·{" "}
            </textPath>
          </text>
        </svg>
        <span
          style={{
            position: "absolute",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 22,
            color: "#5a4a2c",
          }}
        >
          ★
        </span>
      </div>

      {/* small floating swing card */}
      <div
        className="portrait-swing"
        style={{
          position: "absolute",
          bottom: -36,
          left: -40,
          width: 180,
          aspectRatio: "4 / 5",
          background: "#fff",
          borderRadius: 30,
          padding: 8,
          transform: "rotate(-7deg)",
          boxShadow: "0 18px 36px rgba(31,42,55,.12)",
          animation: "float-y 9s ease-in-out 1.2s infinite",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 22, overflow: "hidden" }}>
          <Image
            src="/images/swing.jpg"
            alt="Pooshie and Kitty on a swing — watercolor"
            fill
            sizes="180px"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* tiny "13 stories" sticker */}
      <div
        className="portrait-sticker"
        style={{
          position: "absolute",
          top: 40,
          left: -56,
          background: "#21A1C4",
          color: "#fff",
          padding: "10px 18px",
          borderRadius: 999,
          fontFamily: "var(--font-ui)",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          transform: "rotate(-12deg)",
          boxShadow: "0 8px 20px rgba(33,161,196,.3)",
        }}
        aria-hidden
      >
        13 chapters
      </div>
    </div>
  );
}
