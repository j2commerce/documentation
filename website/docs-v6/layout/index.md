---
title: "Template Layouts"
sidebar_label: "Template Layouts"
sidebar_position: 7
description: "Choose the right J2Commerce template layout for your Joomla template framework."
---

# Template Layouts

J2Commerce provides two sets of ready-made layouts to match the CSS framework your Joomla template already uses. Picking the right one means your product listings and detail pages inherit your template's look and feel without extra styling work.

## Which layout should I use?

| Your Joomla template uses... | Choose this layout |
|------------------------------|-----------------|
| Bootstrap 5 (most Joomla templates) | [Bootstrap 5 Layouts](./bootstrap5-layouts.md) |
| UIKit 3 (YOOtheme Pro and similar) | [UIKit Layouts](./uikit-layouts.md) |

If you are not sure which framework your template uses, check your template's documentation or inspect any page on your site. Bootstrap 5 templates use class names like `container`, `row`, and `col-md-*`. UIKit templates use class names that start with `uk-`.

## Setting the layout in J2Commerce

You set your preferred layout once in **J2Commerce** -> **Configuration** -> **Store** tab. Look for the **Layout** field and select the option that matches your template. Individual menu items can override this setting if you need different layouts on different pages of your site.

## Layout guides

- [Bootstrap 5 Layouts](./bootstrap5-layouts.md) — For Cassiopeia, Helix Ultimate, Astroid, and most standard Joomla templates.
- [UIKit Layouts](./uikit-layouts.md) — For YOOtheme Pro, Warp 7, and other UIKit-based templates.
