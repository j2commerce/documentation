---
description: J2Commerce (formerly known as J2Store)
---

# Short codes

Shortcodes are for Joomla article layouts.

The purpose of providing those short codes is to support Joomla! The layouts are not under J2Commerce’s control. It is developed and maintained by Joomla.

However product list layout / product pages are meant for displaying products and are maintained by J2Commerce. It already has the code (PHP code) in its view files to display products and elements.

However, article layouts / core Joomla! layouts don't. That is why the short code is processed. So the short codes are provided for Joomla layouts. They won't work in J2Commerce’s product layouts.

```
Adding more short codes to j2commerce pages (which already processes the products) would result in force processing / invoking j2store again and again resulting in performance issues.
```

## Additional short codes <a href="#additional-short-codes" id="additional-short-codes"></a>

In addition to the primary short code, you can also use the following additional codes inside `{j2store}{/j2store}`. Each code should be separated by a pipe (|) symbol.

To place this shortcode, the first and most important thing is to change the Add to Placement mode.

Go to Components > J2Commerce. In the top section, select Setup > Configuration.&#x20;

![Short codes](<../../assets/cart_button2.webp>)

Select the Cart tab. Set the Add to Cart placement to Both or Within the article using the tag. Save.

![Short codes](<../../assets/cart_button1.webp>)

### Example: <a href="#example" id="example"></a>

`{j2store}xx|upsells|crosssells{/j2store}`

These additional short codes will work in all **Add to cart** placement modes. Please use these codes judiciously and wisely for better performance.

List of shortcodes available and their description

**cart** - Full cart with price, options, and add to cart button `{j2store}XX|cart{/j2store}`

**Price** - This short code indicates both regular price and selling price `{j2store}XX|price{/j2store}`

![Price shortcode](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_price.png)

![Add to cart shortcode](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_cart.png)

**Saleprice** - This code is for only the selling price `{j2store}XX|saleprice{/j2store}`

![Sales price](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_sale_price.png)

**Regularprice** - This denotes only the regular price `{j2store}XX|regularprice{/j2store}`

![Regular price](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_regular_price.png)

**Thumbnail** - This indicates a thumbnail is added via the J2Commerce (J2Store Cart) tab > images tab `{j2store}XX|thumbnail{/j2store}` ![Thumbnail](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_thumb.png)

**Mainimage** - This shortcode indicates a main image is added via J2Commerce (J2Store Cart) tab > images tab `{j2store}XX|mainimage{/j2store}`

![Main image](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_main.png)

**Mainadditional** - This is an indication that both main and additional images are added via the J2Commerce (J2Store Cart) tab > images tab `{j2store}XX|mainadditional{/j2store}`

![Main additional](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_mainadditional.png)

**Upsells** - This shows up-selling of products `{j2store}XX|upsells{/j2store}`

![Upsells](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_upsells.png)

**Crosssells** - This shows cross selling of products `{j2store}XX|crosssells{/j2store}` ![Crosssells](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_crosssells.png)

### Example <a href="#example-1" id="example-1"></a>

`{j2store}1|thumbnail|cart{/j2store}`

![Cart thumb](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/short-codes/shortcode_cart_thumb.png)

### Video Tutorial: <a href="#video-tutorial" id="video-tutorial"></a>

[![Watch the video](https://img.youtube.com/vi/YwgwQj83cMo/hqdefault.jpg)](https://www.youtube.com/watch?v=YwgwQj83cMo)
