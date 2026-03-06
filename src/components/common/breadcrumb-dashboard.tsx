import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useLocation, Link } from "react-router-dom";
import { Fragment } from "react";

export default function DashboardBreadCrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const route = "/" + paths.slice(0, index + 1).join("/");

          return (
            <Fragment key={`${index}-${path}`}>
              <BreadcrumbItem className="capitalize">
                {index < paths.length - 1 ? (
                  <BreadcrumbLink asChild>
                    <Link to={route}>{path}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{path}</BreadcrumbPage>
                )}
              </BreadcrumbItem>

              {index < paths.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
