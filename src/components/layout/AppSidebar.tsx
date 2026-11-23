import { useCallback, useEffect, useRef, type RefObject } from "react";
import { NavLink, useNavigate } from "react-router";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { appNav } from "@/data/appNav";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { getInitials } from "@/lib/format";
import { useAuthStore } from "@/stores/authStore";
import { useUiStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";
import { buttonStyles } from "../ui/buttonStyles";

/**
 * The same content appears in two containers: the desktop sidebar and the mobile
 * drawer. They differ in one way that matters. The desktop sidebar turns into an
 * icon-only rail at <=1100px; the drawer never does, because it is only ever shown
 * on phones and always has room for labels. `variant` switches the rail styles off.
 *
 * The rail is done with CSS breakpoints (max-[1100px]:) rather than a JS resize
 * listener: no re-render on resize, and no flash of the wrong layout on load.
 */
type Variant = "sidebar" | "drawer";

type SharedProps = {
  variant: Variant;
  /** Close the drawer. Only passed for the drawer variant. */
  onNavigate?: () => void;
};

type NavListProps = SharedProps & {
  /** Badge numbers keyed by route, e.g. { "/tasks": 14 }. */
  counts: Partial<Record<string, number>>;
};

function NavList({ variant, counts, onNavigate }: NavListProps) {
  const rail = variant === "sidebar";

  return (
    <nav aria-label="Main" className="grid gap-0.5">
      {appNav.map((group, i) => (
        <div key={i} className="grid gap-0.5">
          {group.title && (
            <p
              className={cn(
                "mx-2.5 mb-1 mt-4 text-xs font-medium text-muted-foreground",
                rail && "max-[1100px]:hidden",
              )}
            >
              {group.title}
            </p>
          )}

          {group.items.map((item) => {
            const count = counts[item.to];
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                // In the rail the label is visually hidden, so sighted mouse users
                // get a tooltip. (It is redundant, but harmless, when labels show.)
                title={rail ? item.label : undefined}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-body transition-colors hover:bg-secondary hover:text-foreground",
                    rail &&
                      "max-[1100px]:h-10 max-[1100px]:w-11 max-[1100px]:justify-center max-[1100px]:p-0",
                    // NavLink matches by prefix, so /projects/42 keeps "Projects" lit.
                    // Active = tint + tinted icon + a 3px bar flush with the sidebar's
                    // left edge (-left-3 cancels the sidebar's 12px padding). Several
                    // cues, not color alone, so it still reads for color-blind users.
                    isActive &&
                      "bg-primary-soft text-foreground before:absolute before:inset-y-2 before:-left-3 before:w-[3px] before:rounded-r-[3px] before:bg-primary-hover",
                    // The rail has 10px of padding, not 12px, so the bar sits 2px closer.
                    rail && isActive && "max-[1100px]:before:-left-2.5",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      name={item.icon}
                      className={cn(isActive && "text-primary-hover")}
                    />
                    <span className={cn(rail && "max-[1100px]:sr-only")}>
                      {item.label}
                    </span>
                    {count !== undefined && (
                      <span
                        className={cn(
                          "ml-auto font-mono text-[11px] font-normal text-muted-foreground",
                          rail && "max-[1100px]:hidden",
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

/** Static for now: there is a single workspace per user. */
function WorkspaceChip({ variant }: { variant: Variant }) {
  const rail = variant === "sidebar";
  const name = useAuthStore((s) => s.user?.name ?? "");
  const label = name ? `${name.split(" ")[0]}'s workspace` : "My workspace";

  return (
    <div
      className={cn(
        "mb-2 flex items-center gap-2.5 rounded-[10px] border border-border bg-secondary px-2.5 py-2 text-[13px] font-medium text-foreground",
        rail && "max-[1100px]:justify-center max-[1100px]:p-2",
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-6 shrink-0 place-items-center rounded-md bg-primary font-mono text-[11px] font-medium text-primary-foreground"
      >
        {getInitials(name)}
      </span>
      <span className={cn("truncate", rail && "max-[1100px]:sr-only")}>
        {label}
      </span>
    </div>
  );
}

function SidebarUser({ variant, onNavigate }: SharedProps) {
  const rail = variant === "sidebar";
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    onNavigate?.(); // close the drawer first (see the unmount reset in AppSidebar too)
    logout();
    // The route guard only runs on navigation, so navigate ourselves. `replace`
    // stops Back from returning to a protected page.
    navigate("/login", { replace: true });
  }

  // `?.` because the store can briefly hold null between logout() and the redirect.
  const name = user?.name ?? "";

  return (
    // mt-auto pins this to the bottom of the sidebar however short the nav is.
    <div
      className={cn(
        "mt-auto flex items-center gap-2.5 border-t border-border p-2.5",
        rail && "max-[1100px]:flex-col max-[1100px]:border-0 max-[1100px]:px-0",
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-primary to-cyan text-xs font-semibold text-white"
      >
        {getInitials(name)}
      </span>
      {/* The design shows a job title here; we have no such field, so the email stands in. */}
      <div
        className={cn(
          "min-w-0 flex-1 text-[13px] font-medium leading-tight text-foreground",
          rail && "max-[1100px]:sr-only",
        )}
      >
        <p className="truncate">{name}</p>
        <p className="truncate text-xs font-normal text-muted-foreground">
          {user?.email}
        </p>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        aria-label="Log out"
        className={buttonStyles({
          variant: "ghost",
          className: "size-8 shrink-0 px-0",
        })}
      >
        <Icon name="log-out" />
      </button>
    </div>
  );
}

function SidebarContent({ variant, counts, onNavigate }: NavListProps) {
  const rail = variant === "sidebar";
  return (
    <>
      <Logo
        to="/dashboard"
        onClick={onNavigate}
        className={cn(
          "px-2.5 pb-3.5 pt-1.5 text-[17px]",
          rail && "max-[1100px]:justify-center max-[1100px]:px-0",
        )}
        textClassName={rail ? "max-[1100px]:sr-only" : undefined}
      />
      <WorkspaceChip variant={variant} />
      <NavList variant={variant} counts={counts} onNavigate={onNavigate} />
      <SidebarUser variant={variant} onNavigate={onNavigate} />
    </>
  );
}

type AppSidebarProps = {
  /** Whichever button opened the drawer; focus returns to it on close. A ref (not a
   *  fixed element) because two buttons can open it: the top bar's menu and "More". */
  returnFocusRef: RefObject<HTMLElement | null>;
  /** Badge numbers keyed by route. Wire to the Redux store once projects/tasks exist. */
  counts?: Partial<Record<string, number>>;
};

export function AppSidebar({ returnFocusRef, counts = {} }: AppSidebarProps) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const open = useUiStore((s) => s.mobileNavOpen);
  const setOpen = useUiStore((s) => s.setMobileNavOpen);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // useModalBehavior re-runs its effect whenever `onClose` changes identity, and
  // each run restores focus to the trigger. An inline arrow would be new every
  // render and cause exactly that, so the callback must be memoised.
  const close = useCallback(() => setOpen(false), [setOpen]);

  // If the layout unmounts while the drawer is open (e.g. logging out from it), the
  // store would keep `open: true` and the drawer would pop open on the next login.
  useEffect(() => () => setOpen(false), [setOpen]);

  useModalBehavior({
    open,
    onClose: close,
    panelRef,
    initialFocusRef: closeButtonRef,
    returnFocusRef,
    closeAtMinWidth: 761, // the design's phone breakpoint: the drawer is hidden above it
  });

  return (
    <>
      {/* Wide screens. `hidden` + `min-[761px]:flex` shows it only above the phone
          breakpoint; when collapsed it is display:none, which also removes its links
          from the Tab order and the accessibility tree. */}
      <aside
        id="sidebar"
        aria-label="Sidebar"
        className={cn(
          "sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-border bg-card px-3 py-3.5",
          // <=1100px: icon rail (labels hide via the max-[1100px] classes inside).
          "max-[1100px]:w-[68px] max-[1100px]:items-center max-[1100px]:px-2.5",
          collapsed ? "min-[761px]:hidden" : "min-[761px]:flex",
        )}
      >
        <SidebarContent variant="sidebar" counts={counts} />
      </aside>

      {/* Phones: an overlay drawer. `inert` takes it out of the tab order and the
          accessibility tree while closed, so its hidden links can't be focused. */}
      <div
        className={cn(
          "fixed inset-0 z-50 min-[761px]:hidden",
          !open && "pointer-events-none",
        )}
        inert={!open}
      >
        <div
          aria-hidden="true"
          onClick={close}
          className={cn(
            "absolute inset-0 bg-black/55 transition-opacity duration-200 motion-reduce:transition-none",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          ref={panelRef}
          id="mobile-sidebar"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className={cn(
            "absolute inset-y-0 left-0 flex w-[264px] max-w-[85vw] flex-col gap-0.5 overflow-y-auto border-r border-border bg-card px-3 py-3.5 shadow-2xl transition-transform duration-200 motion-reduce:transition-none",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {/* Not in the design (it closes via scrim and Esc only), but touch and
              screen-reader users need a visible, labelled way to dismiss a dialog. */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close menu"
            className={buttonStyles({
              variant: "ghost",
              className: "absolute right-2 top-2.5 size-9 px-0",
            })}
          >
            <Icon name="x" />
          </button>
          <SidebarContent variant="drawer" counts={counts} onNavigate={close} />
        </div>
      </div>
    </>
  );
}
