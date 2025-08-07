---
description: J2Commerce (formerly known as J2Store)
---

# Unable to save the settings in any app

If you are not able to save the settings at the backend of the site, it might be because of the following reasons:

* Database type
* Browser

## Database type: <a href="#database-type" id="database-type"></a>

Please make sure that you have set the Database type as MySQLi and not MySQL(PDO).

MySQLi is the supported database type.

You could check this under System > Global configuration > Server tab > Database type.

![Database type in Joomla configuration](https://raw.githubusercontent.com/j2store/doc-images/master/frequently-asked-questions/not-able-to-save-settings/database-type.png)

## Browser type: <a href="#browser-type" id="browser-type"></a>

Please make sure that the browser you are using is not Safari.

There is a Joomla! An issue while trying to save settings with Safari.

There has been an issue in the core.js file of Joomla that causes this issue.

We have this issue raised, and we have yet to receive a solution for this concern.

Still have questions? You can contact support: [Click here](https://www.j2commerce.com/support)
