import * as React from "react";
import {
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Breadcrumb = React.forwardRef(
  ({ ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      {...props}
    />
  )
);

Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-1.5 overflow-hidden break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
);

BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5",
        className
      )}
      {...props}
    />
  )
);

BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef(
  (
    {
      asChild,
      className,
      ...props
    },
    ref
  ) => {
    if (asChild) {
      const child = React.Children.only(props.children);

      return React.cloneElement(child, {
        ref,
        className: cn(
          "transition-colors hover:text-foreground",
          child.props.className,
          className
        ),
      });
    }

    return (
      <a
        ref={ref}
        className={cn(
          "min-w-0 max-w-[12rem] truncate transition-colors hover:text-foreground sm:max-w-none",
          className
        )}
        {...props}
      />
    );
  }
);

BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "font-normal text-foreground",
        className
      )}
      {...props}
    />
  )
);

BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn(
      "[&>svg]:w-3.5 [&>svg]:h-3.5",
      className
    )}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);

BreadcrumbSeparator.displayName =
  "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex h-9 w-9 items-center justify-center",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />

    <span className="sr-only">
      More
    </span>
  </span>
);

BreadcrumbEllipsis.displayName =
  "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
