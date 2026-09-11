import type { Plugin } from "vite";

export function sites(options: { mockAuth?: boolean } = {}): Plugin {
  return {
    name: "sites-vite-plugin",
    enforce: "pre",
    configureServer(server) {
      if (!options.mockAuth) return;
      server.middlewares.use((req, res, next) => {
        const headers = req.headers as Record<string, string | string[] | undefined>;
        if (!headers["oai-authenticated-user-id"]) {
          headers["oai-authenticated-user-id"] = "local_seedy";
          headers["oai-authenticated-user-email"] = "seedy@sites.test";
          headers["oai-authenticated-user-full-name"] = "Seedy";
          headers["oai-authenticated-user-full-name-encoding"] = "percent-encoded-utf-8";
        }
        next();
      });
    },
  };
}
