---
title: JSX (dashboard)
---

The Membrane [dashboard](/guides/dashboard) uses a custom JSX implementation. This reference page covers all valid elements and styles.

We use flex layout for styling, so your existing mental model from CSS Flexbox should mostly apply here.

## Elements

### Base props

All elements except for [string](#string) can accept these props:

- `style?`: valid properties specific by element (see below)
- `children?`: child element(s), can be `string | number | boolean | null | undefined` or another JSX element
- `key?: string | number`: unique identifier for element in lists
- `tooltip?: string`: Helpful text that appears when hovering over the element

### \<col\>

A vertical container element.

**Props**

- `style?`: accepts [container](#container-styles), [flex](#flex-styles), [sizing](#sizing-styles), and [box](#box-styles) styles
- `link?: Gref`: links element and all its descendents in the UI to a graph node
- All [base props](#base-props)

### \<row\>

A horizontal container element.

**Props**

- `style?`: accepts [container](#container-styles), [flex](#flex-styles), [sizing](#sizing-styles), and [box](#box-styles) styles
- `link?: Gref`: links element and all its descendents in the UI to a graph node
- All [base props](#base-props)

### \<text\>

A text element.

**Props**

- `style?`: accepts [flex](#flex-styles), [sizing](#sizing-styles), and [box](#box-styles) styles
- `numberOfLines?`: dictates maximum number of lines to display before truncating
- `format?: "markdown" | string`: content format - "markdown" renders the content as markdown
- All [base props](#base-props)

### \<string\>

<!-- TODO: per Juan, how we read values from jsx is subject to change -->

A string element for rendering scalar values. Lower level than `<text>`.

**Props**

- `gref`: reference to the value to be rendered
- `value?: Gref`: Text to be rendered

### \<button\>

A clickable button element.

**Props**

- `style?`: accepts [container](#container-styles), [flex](#flex-styles), [sizing](#sizing-styles), and [box](#box-styles) styles
- `action?`: reference (gref) to the action to invoke when clicked
- All [base props](#base-props)

### \<image\>

An image display element.

**Props**

- `style?`: accepts [container](#container-styles), [flex](#flex-styles), [sizing](#sizing-styles), and [box](#box-styles) styles
- `source?`: reference (gref) to the image URL to display
- All [base props](#base-props)

### \<embed\>

An element for embedding complex data structures.

**Props**

- `style`: accepts [container](#container-styles), [flex](#flex-styles), [sizing](#sizing-styles), and [box](#box-styles) styles
- `gref`: reference (gref) to the data to be embedded
- All [base props](#base-props)

## Container styles

### gap

Space between child elements. `string | number`

### alignItems

Alignment of children along the cross axis. `"start" | "end" | "flex-start" | "flex-end" | "center" | "stretch"`

### justifyContent

Alignment of children along the main axis. `"start" | "end" | "flex-start" | "flex-end" | "center" | "space-around" | "space-between" | "stretch"`

### overflowX

Horizontal overflow behavior. `"visible" | "hidden" | "scroll"`

### overflowY

Vertical overflow behavior. `"visible" | "hidden" | "scroll"`

## Text styles

All [sizing](#sizing-styles) and [item](#item-styles) styles are valid for text elements. Plus:

### color

Text color. `string`

### fontSize

Text size - one of predefined sizes. `"small" | "medium" | "large" | "x-large"`

### textAlign

Horizontal text alignment. `"left" | "right" | "center"`

## Flex styles

### flexShrink

Controls how much an element will shrink relative to others (0.0 to 1.0). `number`

### flexBasis

Sets the initial main size of the element before growing/shrinking. `"auto" | string`

### flexGrow

Controls how much an element will grow relative to others (0.0 to 1.0). `number`

### flexDirection

Sets the direction of the flex container's main axis. `"row" | "row-reverse" | "column" | "column-reverse"`

### alignSelf

Overrides the alignItems value for this specific element. `"start" | "end" | "flex-start" | "flex-end" | "center" | "stretch"`

## Sizing styles

### width

Element width (px, %, or other CSS units). `string | number`

### height

Element width (px, %, or other CSS units). `string | number`

## Box styles

### background

Background color - "auto" generates a color automatically. `"auto" | string`

### border

Border width. `string | number`

### borderRadius

Border corner radius. `string | number`

### borderColor

Border color - "auto" generates a color automatically. `"auto" | string`

### left

Distance from the left edge. `string | number`

### top

Distance from the top edge. `string | number`

### right

Distance from the right edge. `string | number`

### bottom

Distance from the bottom edge. `string | number`

### padding

Space inside the element between content and border. `string | number`

### margin

Space outside the element between border and adjacent elements. `string | number`

### opacity

Opacity of the element and its descendants. Must be between 0.0 to 1.0. `string | number`
