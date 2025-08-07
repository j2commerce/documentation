---
description: J2Commerce (formerly known as J2Store)
---

# Translating filters to your language

Let us suppose that you have already created filters in a particular language and you wish to translate the filters to another language. This is how you could do it.

## INSTANCE: <a href="#instance" id="instance"></a>

Languages available on the site: English, German. Filters have been created in language: English. Filters to be translated in language: German.

### Example: <a href="#example" id="example"></a>

Let us assume that we have got the following filter and the following values for the filter:

Filter Group: Gender

Filter value 1: Male

Filter value 2: Female

### Steps to be done: <a href="#steps-to-be-done" id="steps-to-be-done"></a>

* Please navigate to J2Commerce > Catalog > Filters/specifications
* Edit your filter, in our instance, it is the Filter Group with the title “Gender”
* Replace the title with the following language constant (please note that this is custom-defined, you could use any constant on this. Just make sure that you have mentioned the constant in UPPERCASE letters. And make sure that you use the exact constant in the language overrides that we are going to create ): J2STORE\_\_FILTER\_\_GENDER
* Now, replace the values of the filter with custom language constants like this: J2STORE\_\_GENDER\_\_MALE, J2STORE\_\_GENDER\_\_FEMALE

![filterslang](../../../assets/filters4.webp)

* Now that we have defined our constants, our next step is to create the language override
* Navigate to Extensions > Language Overrides > Choose the language German

![lagchoose](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-fil-overr-choose-lang.png)

* Click the new button and create an override for the constant: J2STORE\_\_FILTER\_\_GENDER
* Create an override for the other two constants as well in the same language

![langeditoverride](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-filt-override-german.png)

![langfilgerman](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-filt-override-german-fil-val.png)

![langfilgerman1](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-filt-override-german-fil-val-1.png)

* Choose the language as English at the languages filter

![chooseenglish](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-filt-choose-eng-lang.png)

* Create language overrides for the three constants here as well and mention the text that has to be displayed on the English site for this filter and the values

![overrideeng](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-filt-override-English-fil-title.png)

![overrideengval1](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-fil-overr-eng-fil-val.png)

![engoverrideval1](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-fil-overr-eng-fil-val.png)

![engoverrideval2](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-filt-override-English-fil-val-1.png)

* Assign the filter and its values to the products you desire under the Filters tab of the product article of both the English and German language

![filtertabeng](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-fil-assi-filt-eng.png)

![filtertabgerman](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-fil-assi-filt-Ger.png)

* Navigate to frontend and you would see the texts that you defined in each language for the constants in the place of the filters respectively

**English Language:**

![engfront](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-fil-eng-front.png)

**German Language:**

![germnafront](https://raw.githubusercontent.com/j2store/doc-images/master/catalog/translating-filters-to-your-lang/trans-fil-Ger-front.png)
