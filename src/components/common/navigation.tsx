import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/constants/navigation-constants";

export default function Navigation() {
  return (
    <div className="border-b">
      <nav className="flex gap-6 text-sm">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "pb-3 border-b-2 transition-colors",
                isActive
                  ? "border-white text-foreground font-medium"
                  : "border-transparent text-white hover:text-foreground",
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
