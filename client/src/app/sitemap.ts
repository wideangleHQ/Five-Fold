import { MetadataRoute } from "next";
import { getPublishedProjects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fivefoldsolar.com";

  const staticRoutes = [
    "",
    "/about",
    "/engineering",
    "/services",
    "/projects",
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

  // Only published projects leak into sitemap
  const publishedProjects = getPublishedProjects();
  const projectRoutes = publishedProjects.map((project) => ({
    url: `${baseUrl}/projects#${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
