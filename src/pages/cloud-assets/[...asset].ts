/**
 * This file is responsible for serving files from R2 or locally during development
 *
 * During production we don't actually want this route to be called at all. What we really want
 * is for a rewrite rule to trigger that points to the CDN directly.
 *
 * TODO: Write a script that syncs the contents of the `cloud-assets` directory with the CDN
 */

import type { APIRoute } from "astro";
import manifest from "~/cloud-assets/manifest.json";
import { imageConfig, getConfiguredImageService } from "astro:assets";
import mime from "mime/lite";

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  // TODO: This should be updated to be a custom URL
  const ASSET_HOST = "https://pub-9f5707ce32c7495d9687b939883b271d.r2.dev";
  const ASSET_PATH =
    manifest.assets[
      url.pathname.split("cloud-assets/")[1] as keyof typeof manifest.assets
    ];
  if (!ASSET_PATH) {
    return new Response("asset not found", { status: 404 });
  }

  const asset_url = new URL(ASSET_PATH, ASSET_HOST);
  asset_url.search = url.search;

  // In production let's pull directly from the CDN
  // Preferably this isn't called at all and is just handled by a rewrite rule
  return fetch(asset_url);
};
