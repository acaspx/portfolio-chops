/**
 * NYC subway mosaic nameplate, after the 1904 Heins & LaFarge IRT tablets
 * (Wall St in particular) and the cut-tile technique Squire Vickers described:
 * "the body is burned in strips, glazed, and then broken into irregular
 * shapes. The designs are set by hand."
 *
 * The artwork is generated, not drawn: scripts/mosaic.py paints a flat design,
 * lays real tesserae over it in running-bond courses, cuts pieces where they
 * straddle a letter edge, and colours each one with glaze and patina variation.
 * The letters are the field's own tiles changing colour, which is why their
 * curves and diagonals step the way real tablet lettering does.
 *
 * Output is two static SVGs in /public/mosaic, served through <picture> so the
 * browser downloads only the one it needs. Regenerate with:
 *   python3 scripts/mosaic.py
 *
 * The artwork is decorative; the accessible name is a visually-hidden h1.
 */
export default function MosaicName() {
  return (
    <>
      <h1 className="sr-only">Anton Castro</h1>
      <picture>
        <source
          media="(min-width: 640px)"
          srcSet="/mosaic/name-wide.svg"
          width={2080}
          height={509}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mosaic/name-narrow.svg"
          width={1280}
          height={744}
          alt=""
          aria-hidden
          decoding="async"
          fetchPriority="high"
          className="block h-auto w-full max-w-[20rem] select-none sm:max-w-none"
          draggable={false}
        />
      </picture>
    </>
  );
}
