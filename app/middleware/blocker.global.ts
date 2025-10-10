export default defineNuxtRouteMiddleware((to) => {
  const userAgent = useRequestHeaders(["user-agent"])["user-agent"] || "";
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

  if (isMobile && to.path !== "/desktop-only") {
    return navigateTo("/desktop-only");
  }

  if (!isMobile && to.path === "/desktop-only") {
    return navigateTo("/");
  }
});
