"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** next/image that fades in once it has loaded, so screenshots arrive softly. */
export default function FadeImage({ className = "", ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-opacity duration-700 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
