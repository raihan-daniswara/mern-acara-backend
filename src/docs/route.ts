import type { Express, Request, Response } from "express";
import swaggerOutput from "./swagger_output.json";

const swaggerHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Dokumentasi API Backend Acara</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
  <div id="swagger-ui"></div>

  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function () {
      window.ui = SwaggerUIBundle({
        url: "/api-docs/swagger.json",
        dom_id: "#swagger-ui",
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout"
      });
    };
  </script>
</body>
</html>
`;

export default function docs(app: Express) {
  app.get("/api-docs/swagger.json", (_req: Request, res: Response) => {
    return res.status(200).json(swaggerOutput);
  });

  app.get("/api-docs", (_req: Request, res: Response) => {
    return res.status(200).type("html").send(swaggerHtml);
  });

  app.get("/api-docs/", (_req: Request, res: Response) => {
    return res.status(200).type("html").send(swaggerHtml);
  });
}