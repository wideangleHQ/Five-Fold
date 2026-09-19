import { MetadataRoute } from "next";
import { getPublishedProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fivefoldsolar.com";

  const staticRoutes = [
    "",
    "/about",
    "/engineering",
    "/services",
    "/solarcare",
    "/schemes",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
