/**
 * Find the first chat link that starts with /messages/t
 */
function findNextChatLink() {
  const allLinks = document.querySelectorAll('a');
  for (let link of allLinks) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('/messages/t')) {
      return link; // Return the first match
    }
  }
  return null; // No more chat links
}

/**
 * Traverse DOM upward to find the row container for the chat
 */
function getChatRowContainer(element) {
  while (element && element.getAttribute('role') !== 'row') {
    element = element.parentElement;
  }
  return element;
}

/**
 * Open the action menu (3-dot menu) inside the chat row
 */
function triggerChatMenu(chatRowElement) {
  return new Promise((resolve) => {
    const gridCells = chatRowElement.querySelectorAll('div[role="gridcell"]');
    const actionCell = gridCells[1];
    const menuButton = actionCell.querySelector("div[role=button]");

    setTimeout(() => {
      menuButton.click();
      console.log("Action menu opened");
      resolve();
    }, 200); // Short delay for UI stability
  });
}

/**
 * Click the "Delete chat" option in the action menu and confirm
 */
function deleteChatFromMenu() {
  return new Promise((resolve) => {
    const menu = document.querySelector("div[role=menu]");
    if (!menu) {
      console.warn("Action menu not found");
      resolve();
      return;
    }

    const menuOptions = menu.querySelectorAll("div[role=menuitem]");
    console.log("Searching for 'Delete chat' option...");

    for (let option of menuOptions) {
      const label = option.querySelector('span');
      if (label && label.textContent.trim() === "Delete chat") {
        option.click(); // Trigger delete
        console.log("'Delete chat' clicked");
        break;
      }
    }

    // Confirm deletion after menu disappears
    setTimeout(() => {
      const confirmButtons = document.querySelectorAll('[aria-label="Delete chat"]');
      if (confirmButtons[2]) {
        confirmButtons[2].click();
        console.log("Chat deletion confirmed");
      } else {
        console.warn("Confirmation button not found");
      }
      resolve();
    }, 800); // Delay to wait for confirmation dialog
  });
}

/**
 * Core loop: Repeatedly finds and deletes chats until none are left
 */
async function deleteAllChatsOneByOne() {
  let deletedCount = 0;

  while (true) {
    const nextChatLink = findNextChatLink();

    if (!nextChatLink) {
      console.log(`✅ All chats deleted. Total: ${deletedCount}`);
      break;
    }

    console.log(`🧹 Deleting chat #${deletedCount + 1}...`);
    const chatRow = getChatRowContainer(nextChatLink);
    if (!chatRow) {
      console.warn("Chat row container not found. Skipping...");
      continue;
    }

    await triggerChatMenu(chatRow);               // Step 1: Open menu
    await new Promise(r => setTimeout(r, 1000));  // Allow UI to respond
    await deleteChatFromMenu();                   // Step 2: Delete + confirm
    await new Promise(r => setTimeout(r, 2000));  // Wait for DOM update

    deletedCount++;
  }
}

// Run the chat deletion process
deleteAllChatsOneByOne();
