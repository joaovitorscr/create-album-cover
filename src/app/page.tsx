import { DropImage } from "@/components/drop-image";
import * as React from "react";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto flex flex-col items-center min-h-dvh justify-center gap-8">
      <h1 className="text-5xl font-semibold tracking-tighter">
        Create Album Cover
      </h1>
      <section>
        <DropImage />
      </section>
    </main>
  );
}
