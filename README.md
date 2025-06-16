# 🧹 Facebook Messenger Auto Chat Deleter Script 2025

A lightweight JavaScript script to automatically delete all chat threads from Facebook Messenger (Web).

---

## 🔧 Technical Overview

- Selects chats using anchor tags (`<a>`) with `href` starting with `/messages/t` (change it in code according to Facebook update)
- Locates chat containers via `role="row"`
- Simulates human clicks on menu buttons and delete confirmations
- Uses Promises and `setTimeout` for UI safety and timing

---

## 🗓️ Last Tested

This script has been tested and confirmed working as of **June 2025**.

---

## 🚀 How to Use

1. Open [Facebook Messenger Web](https://www.facebook.com/messages/t/)
2. Press `Ctrl + Shift + J` (Windows/Linux) or `Cmd + Option + J` (Mac) to open the DevTools Console
3. Paste the full script and press `Enter`
4. The script will begin deleting chats one by one

---

## 🔄 Maintenance Note

The chat detection logic currently uses this condition in the code (change it accroding to Facebook update):

```js
if (href && href.startsWith('/messages/t'))
