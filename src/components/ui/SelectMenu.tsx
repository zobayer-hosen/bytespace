"use client";

import { Check, type LucideIcon } from "lucide-react";
import { useId, useRef } from "react";
import { cn } from "@/lib/cn";
import { PopoverPanel, usePopover } from "./Popover";

export type SelectMenuOption<T extends string> = {
  value: T;
  label: string;
  /** Number of results this option would return, shown on the right. */
  count?: number;
};

type SelectMenuProps<T extends string> = {
  /** Accessible name of the menu, e.g. "Level". */
  label: string;
  /** Text on the trigger (usually the current choice). */
  triggerLabel: string;
  icon: LucideIcon;
  options: readonly SelectMenuOption<T>[];
  value: T;
  onChange: (value: T) => void;
  align?: "start" | "end";
  triggerClassName?: string;
};

const MOVE_KEYS: Record<string, (index: number, last: number) => number> = {
  ArrowDown: (index, last) => (index >= last ? 0 : index + 1),
  ArrowUp: (index, last) => (index <= 0 ? last : index - 1),
  Home: () => 0,
  End: (_, last) => last,
};

/** Menu button with single-choice items (`menuitemradio`); arrow keys, Home/End and Escape supported. */
export function SelectMenu<T extends string>({
  label,
  triggerLabel,
  icon: Icon,
  options,
  value,
  onChange,
  align = "start",
  triggerClassName,
}: SelectMenuProps<T>) {
  const menuId = useId();
  const { open, setOpen, close, rootRef, triggerRef, handleBlur } = usePopover();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleTriggerKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function handleMenuKeyDown(event: React.KeyboardEvent) {
    const move = MOVE_KEYS[event.key];
    if (!move) return;
    event.preventDefault();
    const current = itemRefs.current.findIndex((item) => item === document.activeElement);
    itemRefs.current[move(current, options.length - 1)]?.focus();
  }

  function select(next: T) {
    onChange(next);
    close(true);
  }

  return (
    <div ref={rootRef} onBlur={handleBlur} className="sm:relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={handleTriggerKeyDown}
        className={triggerClassName}
      >
        <Icon aria-hidden className="size-4" />
        <span className="sr-only">{label}: </span>
        {triggerLabel}
      </button>

      <PopoverPanel
        open={open}
        align={align}
        id={menuId}
        role="menu"
        aria-label={label}
        onKeyDown={handleMenuKeyDown}
        className="max-h-80 overflow-y-auto sm:w-64"
      >
        {options.map((option, index) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={selected}
              tabIndex={-1}
              // Items mount when the menu opens, so this moves focus to the current choice.
              autoFocus={selected}
              onClick={() => select(option.value)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-ink transition-colors",
                "hover:bg-surface focus-visible:bg-surface focus-visible:outline-offset-[-2px]",
                selected && "font-medium",
              )}
            >
              <Check aria-hidden className={cn("size-4 shrink-0 text-brand", !selected && "invisible")} />
              <span className="flex-1">{option.label}</span>
              {option.count !== undefined && (
                <span className="text-xs font-normal text-muted">
                  {option.count}
                  <span className="sr-only"> results</span>
                </span>
              )}
            </button>
          );
        })}
      </PopoverPanel>
    </div>
  );
}
