# Membrane Docs

[<img src="https://astro.badg.es/v2/built-with-starlight/tiny.svg" align="right" />](https://starlight.astro.build)

[Membrane](https://membrane.io) site hosted at [docs.membrane.io](https://docs.membrane.io).

Note that Membrane is currently in `alpha` state. Help us grow by contributing to these docs and [publishing your Membrane creations](https://docs.membrane.io/concepts/packages/).

## Contributing

This repo uses [git-lfs](https://git-lfs.com/) to store large files like images and videos. You'll need to:

 - Install git-lfs on your machine using `brew install git-lfs`.
 - One time set up of git hooks for your local clone using `git lfs install`.

To run the docs locally:

```
npm install
npm run dev
```

Feel free to open a pull request!

### Where to put images and videos

 - `/public`: Put videos here. Images here won't be optimized by astro.
 - `/src/assets`: Put images here so that astro can optimize them.

