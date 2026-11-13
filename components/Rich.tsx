import { Fragment, type CSSProperties } from "react";

/**
 * Renders a dictionary string with light markup:
 * "\n" becomes a line break and *text* becomes <em>text</em>.
 */
export function Rich({ text, emStyle }: { text: string; emStyle?: CSSProperties }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.split("*").map((part, j) =>
            j % 2 === 1 ? (
              <em key={j} style={emStyle}>
                {part}
              </em>
            ) : (
              <Fragment key={j}>{part}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </>
  );
}
