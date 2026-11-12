"use client";

import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type FloatingDockItem = {
  title: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
};

export function FloatingDock({
  items,
  desktopClassName,
  mobileClassName,
  itemClassName,
}: {
  items: FloatingDockItem[];
  desktopClassName?: string;
  mobileClassName?: string;
  itemClassName?: string;
}) {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        className={desktopClassName}
        itemClassName={itemClassName}
      />
      <FloatingDockMobile
        items={items}
        className={mobileClassName}
        itemClassName={itemClassName}
      />
    </>
  );
}

function FloatingDockMobile({
  items,
  className,
  itemClassName,
}: {
  items: FloatingDockItem[];
  className?: string;
  itemClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: { delay: index * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - index) * 0.05 }}
              >
                <DockAction
                  item={item}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full bg-gray-50",
                    itemClassName,
                  )}
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </DockAction>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close slide navigation" : "Open slide navigation"}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500" />
      </button>
    </div>
  );
}

function FloatingDockDesktop({
  items,
  className,
  itemClassName,
}: {
  items: FloatingDockItem[];
  className?: string;
  itemClassName?: string;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(event) => mouseX.set(event.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 overflow-visible rounde-md bg-gray-50 px-4 pb-3 md:flex",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          item={item}
          className={itemClassName}
        />
      ))}
    </motion.div>
  );
}

function DockAction({
  item,
  className,
  children,
}: {
  item: FloatingDockItem;
  className?: string;
  children: ReactNode;
}) {
  const handleClick = (
    event: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    if (!item.href) event.preventDefault();
    item.onClick?.();
  };

  if (item.href) {
    return (
      <a href={item.href} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

function IconContainer({
  mouseX,
  item,
  className,
}: {
  mouseX: MotionValue<number>;
  item: FloatingDockItem;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });
  const width = useSpring(
    useTransform(distance, [-180, 0, 180], [28, 62, 28]),
    { mass: 0.1, stiffness: 180, damping: 14 },
  );
  const height = useSpring(
    useTransform(distance, [-180, 0, 180], [24, 44, 24]),
    { mass: 0.1, stiffness: 180, damping: 14 },
  );
  const widthIcon = useSpring(
    useTransform(distance, [-180, 0, 180], [14, 26, 14]),
    { mass: 0.1, stiffness: 180, damping: 14 },
  );
  const heightIcon = useSpring(
    useTransform(distance, [-180, 0, 180], [14, 26, 14]),
    { mass: 0.1, stiffness: 180, damping: 14 },
  );
  const [hovered, setHovered] = useState(false);

  return (
    <DockAction item={item} className="relative">
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className={cn(
          "relative flex items-center justify-center rounded-full bg-gray-200",
          className,
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-7 left-1/2 w-fit rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold whitespace-pre text-[#0a1f44]"
            >
              {item.title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {item.icon}
        </motion.div>
      </motion.div>
    </DockAction>
  );
}

export default FloatingDock;
