"use client";

import { useState, useId, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/grid-pattern";
import { cn } from "@/lib/utils";

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  );
}

function Header({
  panelId,
  invert = false,
  icon: Icon,
  expanded,
  onToggle,
  toggleRef,
}) {
  return (
    <div className="flex items-center justify-between container">
      <Link href="/" aria-label="Home">
        <h1
          className={cn(
            "text-2xl font-regular tracking-tight leading-none",
            invert
              ? "text-white group-hover:text-neutral-200"
              : "text-neutral-950 group-hover:text-neutral-700"
          )}
        >
          Delfi Vecchietti
        </h1>
      </Link>
      <div className="flex items-center gap-x-8">
        <Button
          className={cn(
            invert
              ? "bg-white text-gray-900 hover:text-white hover:bg-gray-600/10"
              : "text-white bg-gray-900 hover:bg-gray-600"
          )}
        >
          Contact us
        </Button>
        <button
          ref={toggleRef}
          type="button"
          onClick={onToggle}
          aria-expanded={expanded.toString()}
          aria-controls={panelId}
          className={cn(
            "group -m-2.5 rounded-full p-2.5 transition",
            invert ? "hover:bg-white/10" : "hover:bg-neutral-950/10"
          )}
          aria-label="Toggle navigation"
        >
          <Icon
            className={cn(
              "h-6 w-6",
              invert
                ? "fill-white group-hover:fill-neutral-200"
                : "fill-neutral-950 group-hover:fill-neutral-700"
            )}
          />
        </button>
      </div>
    </div>
  );
}

function NavigationRow({ children }) {
  return (
    <div className="even:mt-px sm:bg-neutral-950">
      <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function NavigationItem({ href, children }) {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  );
}

function Navigation() {
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href="/work">Mi trabajo</NavigationItem>
        <NavigationItem href="/about">Acerca de mi</NavigationItem>
      </NavigationRow>
    </nav>
  );
}

function RootLayoutInner({ children }) {
  let panelId = useId();
  let [expanded, setExpanded] = useState(false);
  let openRef = useRef<HTMLInputElement>();
  let closeRef = useRef<HTMLInputElement>();
  let navRef = useRef<HTMLInputElement>();
  let shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function onClick(event) {
      if (event.target.closest("a")?.href === window.location.href) {
        setExpanded(false);
      }
    }

    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div
          className="absolute left-0 right-0 top-2 z-40 pt-14"
          aria-hidden={expanded ? "true" : undefined}
        >
          <Header
            panelId={panelId}
            icon={MenuIcon}
            toggleRef={openRef}
            expanded={expanded}
            onToggle={() => {
              setExpanded((expanded) => !expanded);
              window.setTimeout(() =>
                closeRef.current?.focus({ preventScroll: true })
              );
            }}
          />
        </div>

        <motion.div
          layout
          id={panelId}
          style={{ height: expanded ? "auto" : "0.5rem" }}
          className="relative z-50 overflow-hidden bg-neutral-950 pt-2"
          aria-hidden={expanded ? undefined : "true"}
        >
          <motion.div layout>
            <div ref={navRef} className="bg-neutral-950 pb-16 pt-14">
              <Header
                invert
                panelId={panelId}
                icon={XIcon}
                toggleRef={closeRef}
                expanded={expanded}
                onToggle={() => {
                  setExpanded((expanded) => !expanded);
                  window.setTimeout(() =>
                    openRef.current?.focus({ preventScroll: true })
                  );
                }}
              />
            </div>
            <div className="container">
              <Navigation />
              <div className="relative bg-neutral-950 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-neutral-800">
                <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
                  <div>
                    <h2 className="font-display text-base font-semibold text-white">
                      Our offices
                    </h2>
                  </div>
                  <div className="sm:border-l sm:border-transparent sm:pl-16">
                    <h2 className="font-display text-base font-semibold text-white">
                      Seguime
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <motion.div
        layout
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-9"
        >
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}

export function RootLayout({ children }) {
  let pathname = usePathname();

  return <RootLayoutInner key={pathname}>{children}</RootLayoutInner>;
}
