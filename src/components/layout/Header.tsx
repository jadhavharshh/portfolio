import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Header = () => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-dashed px-4 sm:px-6">
      <Link className="flex flex-row items-center gap-2" href="/">
        <span className="instrument-serif text-xl font-semibold">Harsh Jadhav</span>
      </Link>
      <div className="flex flex-row items-center gap-3">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
