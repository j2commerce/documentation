---
title: "Template Overrides"
sidebar_label: "Template Overrides"
sidebar_position: 1
description: "Learn how to customize J2Commerce layouts and templates using the Template Overrides manager."
---

# Template Overrides

The Template Overrides manager allows you to customize the HTML and PHP output of J2Commerce without modifying the core component files. By creating overrides, your customizations are preserved during system updates.

## Prerequisites

- Administrator account with Super User permissions.
- A Joomla template installed and set as the default.

## Accessing Template Overrides

**Step 1:** Go to **J2Commerce** -> **Design** -> **Overrides**.

<!-- SCREENSHOT: J2Commerce Design Overrides main screen showing the list of subtemplates and the layout override path -->

## How It Works

J2Commerce uses a layout system that can be overridden in your active Joomla template. The manager provides a visual way to identify which files can be overridden and an editor to modify them.

### Creating an Override

1. Select a subtemplate from the list.
2. Find the specific layout file you wish to customize.
3. Click the **Create Override** button.
4. J2Commerce will copy the core file to your template's override folder.

### Editing an Override

1. Once an override exists, you can click on the file to open the editor.
2. Modify the PHP/HTML code in the editor.
3. Click **Save** in the toolbar to apply changes.

<!-- SCREENSHOT: The override editor showing the source code for a layout file -->

### Reverting an Override

If you want to return to the default J2Commerce layout:

1. Select the overridden file.
2. Click the **Revert** (or Trash/Delete) button in the toolbar.
3. This removes the file from your template folder, and J2Commerce will resume using the core file.

## Advanced Customization: The Visual Builder

For specific block layouts, J2Commerce provides a **Visual Builder**. This drag-and-drop interface allows you to design layouts without writing code.

1. Click the **Builder** tab in the Overrides manager.
2. Select a block-layout file from the dropdown.
3. Use the visual editor to adjust the design.
4. The changes are saved directly to the override file in your template.

### Using the Visual Builder

The Visual Builder consists of a central canvas and several tool panels.

#### Adding Elements
To add content to your layout:
1. Open the **Components** panel (usually located on the left or right sidebar).
2. Browse the available elements (e.g., Text, Images, Containers).
3. **Click and drag** an element from the panel and drop it directly onto the canvas where you want it to appear.

#### Editing Element Properties
Once an element is on the canvas, you can customize its appearance and behavior:
1. Click on the element within the canvas to select it.
2. Use the **Settings/Style** panel to modify properties:
   - **Content:** Change text, links, or image sources.
   - **Styling:** Adjust margins, padding, colors, and alignment.
   - **Advanced:** Set custom CSS classes or IDs.

#### Arranging Elements
You can easily reorganize your layout:
1. Click and hold an element on the canvas.
2. **Drag and drop** it to a new position. The editor will show a guide line to help you place the element accurately.

#### Previewing and Saving
- **Preview:** Use the preview toggle to see how your layout will look on different screen sizes (Desktop, Tablet, Mobile).
- **Save:** Click the **Save** button in the toolbar to commit your changes to the template override file.

<!-- SCREENSHOT: The Visual Builder interface showing the canvas, components panel, and style settings -->

## Tips

- **Backup First:** Always backup your template folder before making significant manual changes to overrides.
- **Check Core Files:** When editing, refer to the original core file to understand the available variables and logic.
- **Clean Paths:** Overrides are stored in `templates/[your-template]/html/layouts/com_j2commerce` or `templates/[your-template]/html/com_j2commerce/templates`.

## Troubleshooting

### Changes are not appearing on the frontend

**Cause:** The Joomla template cache or a browser cache may be showing an older version of the page.

**Solution:**
1. Clear the Joomla cache via **System** -> **Clear Cache**.
2. Hard-refresh your browser (Ctrl+F5 or Cmd+Shift+R).
3. Verify that you are editing the override for the *currently active* template.

## Related Topics

- [Custom Fields](../configuration/custom-fields.md)
- [Store Design](../design/index.md)
