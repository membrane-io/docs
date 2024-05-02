/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

module "cloud-assets/manifest.json" {
  const manifest: {
    assets: Record<string, string | undefined>;
  };
  export default manifest;
}
