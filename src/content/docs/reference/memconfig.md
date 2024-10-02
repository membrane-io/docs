---
title: memconfig
---

`memconfig.json` is automatically generated and updated based on a program's [schema](https://docs.membrane.io/concepts/schema/) configured in the schema editor UI (bottom left of the IDE). You should rarely have to edit the file itself, although currently there are some features missing in the UI.

## Hints

Hints provided in `memconfig.json` indicate how fields should be displayed in the Navigator.

### Preview
With preview hints, you can mark fields as `primary` and `secondary` to use them as previews in the Navigator, e.g. in a list of paginated results.
```json
{
  "name": "number",
  "type": "String",
  "description": "The Pull Request number.",
  "hints": {
    "primary": true
  }
},
{
  "name": "title",
  "type": "String",
  "description": "The Pull Request title.",
  "hints": {
    "secondary": true
  }
}
```

*Primary in blue, secondary in green.*

![Paginated list of github PRs in the Membrane Navigator](../../../assets/primary_secondary.png)


### Format
The format hint allows you to format a string as a URL in the Navigator.
```json
{
  "name": "url",
  "type": "String",
  "description": "The URL of the Pull Request",
  "hints": {
    "format": "url"
  }
}
```

### Hidden
The hidden hint can be used to mark a field that should not be displayed in the Navigator.

```json
{
  "name": "phone_number",
  "type": "String",
  "description": "The customer's phone number",
  "hints": {
    "hidden": true
  }
}
