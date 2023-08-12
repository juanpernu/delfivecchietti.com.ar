import { cn } from "@/lib/utils";

export function Container({ as: Component = "div", className, children }) {
  return (
    <Component className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </Component>
  );
}
