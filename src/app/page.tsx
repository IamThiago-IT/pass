import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">Hello World!</h1>
      <Button>Click me</Button>
    </>
  );
}
