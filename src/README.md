# Assets in docs

There are three places to store assets depending on their size and purpose.

## `public`

This is for small, raw assets to be bundled with the deployed site with no transformations. Avoid adding images here. This is for minimal assets that we want included in the bundle.

## `src/assets`

This is the directory Astro uses for local optimized images. This is idea for icons, logos, or other small embeddable images

## `cloud-assets`

Most of our image and video assets should be served from a CDN. When you run the docs in dev mode, assets will be copied down from the CDN to this directory as their rendered in the site.

Note that when files are uploaded to the CDN, they're actually named based on a SHA256 hash of their name. If you open `cloud-assets/manifest.json` you'll see a list of all the assets in the CDN as well as their hashed names.

To upload a new cloud asset, just drop it in the `cloud-assets` directory and run

```
npm run upload <filename>
```
