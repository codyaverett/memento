---
name: media queries
created: 2023-03-08T00:25:12-06:00
updated: 2023-03-08T00:26:03-06:00
aliases: 
tags: css
---
# Media Queries

```html
<div class="large-screens">
  I only show up on large screens.
</div>
<div class="small-screens">
  Meanwhile, you'll only see me on small ones.
</div>
```

```css
@media (min-width: 300px) {
  .large-screens {
    display: block;
  }
  .small-screens {
    display: none;
  }
}
```