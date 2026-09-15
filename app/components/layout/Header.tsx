import { Bell, ChevronDown, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-4">
        <div>
          <h2 className="font-heading text-base font-semibold">
            Admin Dashboard
          </h2>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Public Transport Operations Center
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search */}
        <button
          type="button"
          className="hidden h-9 items-center gap-2 rounded-lg border bg-muted/30 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
        >
          <Search className="size-4" />
          <span>Search</span>
          <kbd className="ml-4 rounded border bg-background px-1.5 py-0.5 text-[10px]">
            Ctrl K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-[18px]" />

          <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-background" />
        </button>

        {/* Admin profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-muted"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            A
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-none">Administrator</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              System Admin
            </p>
          </div>

          <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
        </button>
      </div>
    </header>
  );
}