---
title: Usage
layout: layouts/base.njk
subtitle: Get started with CopyPasta
---
### Set system permissions

The app needs a few system permissions for all the features to work. The first permissions we need are for the `active-win` package, which is used to capture metadata on the focused window when the hotkey is pressed.

On macOS, navigate to:
```bash
System Preferences › Security & Privacy › Privacy › Screen Recording
```

You'll need to give permission to whatever app is running `npm start` - most likely your terminal. If you're using VSCode's integrated terminal to run `npm start`, then give "VSCode" permission.

Do the same for "Accessibility"

```bash
System Preferences › Security & Privacy › Privacy › Accessibility
```

### Capturing a snippet

Use the hotkey `Ctrl X` to capture a text snippet from anywhere on your machine. Snippet will save metadata on the time, location, page title, and url of window where the snippet was taken. To see this metadata, click the `Info` icon button on the top right of the app.

### Searching

To search on more than snippet text, you can use the `tag`, `lang`, `origin`, `originUrl` or `originTitle` shortcuts. In the searchbar, type `lang:javascript` and hit enter, this will create a search token. You can add as many search tokens as you want and search text at the same time.

You can also click tokens in the snippet metadata panel which will initiate a search.