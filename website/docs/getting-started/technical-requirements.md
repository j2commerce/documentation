---
description: J2Commerce (formerly known as J2Store)
---

# Technical Requirements

## Server Requirements <a href="#server-requirements" id="server-requirements"></a>

Technical requirements for J2Commerce 4/**Joomla4**:

* PHP 7.2.5 or greater - we recommend 8.2
* MySQL 5.6 or greater - we recommend 8.0
* Joomla 4
* CURL and JSON modules enabled

Technical requirements for J2Commerce 4/**Joomla5**:

* PHP 8.1 or greater - we recommend 8.3
* MySQL 8.0.13 or greater - we recommend 8.1
* Joomla 5
* CURL and JSON modules enabled

### PHP Requirements <a href="#php-requirements" id="php-requirements"></a>

The latest versions of PHP 8 will generate deprecation messages throughout front and back end.
To prevent this, you need to:

- Turn off 'Error Reporting' by setting it to 'None' in your Joomla configuration. This has the disadvantage to disable error reporting for the rest of the site, which may hide issues that would be reported otherwise.

- Set 'Error Reporting' to 'System Default' and modify the ***php.ini*** file on the server side.

  In the php.ini file, look for the error reporting section and add or modify the line: 
  `error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT`

This is a known limitation. Since FOF (the library the J2Store architecture was based on originally) is no longer maintained, it triggers deprecation warnings on the latest PHP releases, but it doesn’t affect core functionality. The team is working on a release free of F0F. [Check our blog post](https://www.j2commerce.com/blog/j2commerce-and-joomla-6) for more information.

## Joomla Requirements <a href="#joomla-requirements" id="joomla-requirements"></a>

Make sure you check these [minimum requirements for Joomla](https://manual.joomla.org/docs/next/get-started/technical-requirements/)

Joomla 4 or 5 - Compatibility Plugin Must Be **Published**
