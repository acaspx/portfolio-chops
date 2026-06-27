/**
 * Subtle ASCII San Francisco horizon: Golden Gate Bridge, downtown skyline
 * (Transamerica pyramid, towers), a fog bank, and water. Pure text, fixed to
 * the bottom of every page, low-contrast sage so it reads as ambient marine
 * layer, never competing with content. Pointer-events off, decorative only.
 */
const ART = [
  "        ^                          v                           .              ^",
  "    ~       ‿        ≈                         ‿     ~                 ≈",
  "                     ╷                    ╷                                ▲",
  "       . ‿ .        ╱│╲     _________    ╱│╲                  ┌┐         ╱·│·╲        ╷",
  "      (·····)   ___╱·│·╲___/         \\__╱·│·╲___       ┌─┐   ┌┤├┐  ┌─┐  ╱··│··╲   ┌┐ ╱│╲",
  "     (·······)═════╪═╪═════════════════════╪═╪═════   ┌┤·├┐┌┤││├┐┌┤·├┐╱···│···╲ ┌┤├┐╱·│·╲ ┌─┐",
  "      `~~~~~`      │ │                      │ │      ┌┤·│·├┤│││││├┤·│·├┤····│····├┤││├┤·│·├┐│·│",
  " ─────────────────┴─┴──────────────────────┴─┴──────┴─┴─┴─┴┴┴┴┴┴┴─┴─┴─┴────┴────┴┴┴┴┴┴─┴─┴┴─┴──",
  "    ~     ≈        <°)><       ~          ‿        ~        \\|/        ≈      ~        ‿",
  "        ‿      ~          ≈            ~           ‿     ~     |    ≈        ~      ≈",
  "   ≈        ~       ‿          ~            ≈          ~       ~~~      ‿        ~",
].join("\n");

export default function SkylineBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 flex justify-center overflow-hidden"
    >
      <pre
        className="select-none font-mono leading-[1.1]"
        style={{
          fontSize: "clamp(5.5px, 1.4vw, 13px)",
          color: "rgba(120, 150, 120, 0.42)",
          margin: 0,
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 40%)",
          maskImage: "linear-gradient(to bottom, transparent, #000 40%)",
        }}
      >
        {ART}
      </pre>
    </div>
  );
}
