const imageGrid = document.getElementById('image-grid');
const menuBar = document.getElementById('menu-bar');

function initializeApp(config) {
    const firstMenuKey = Object.keys(config)[0];
    if (firstMenuKey) {
        const firstMenuData = config[firstMenuKey];
        createImageSection(firstMenuData, imageGrid);
        const firstDiv = menuBar.children[0]; // Assuming the first child is the first menu item
        updateSelectedMenu(firstDiv);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
fetch('config.json')
    .then(response => response.json())
    .then(data => {
        createMenu(data);
        if (data && Object.keys(data).length > 0) {
            initializeApp(data);
        }
    })
    .catch(error => console.error('Error loading JSON:', error));
});

function createImageSection(mappings, container) {
    container.innerHTML = ''; // Clear existing content
    for (const [url, { imgSrc, links }] of Object.entries(mappings)) {
        const div = document.createElement('div');
        div.className = 'group relative p-4 site-card rounded-lg shadow-lg flex flex-col items-center justify-center';
        div.dataset.url = url; // Store the URL in a data attribute

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Image';
        img.className = 'site-image';
        img.dataset.links = JSON.stringify(links); // Store links as a data attribute

        div.appendChild(img);
        container.appendChild(div);
    }

    // Add a single event listener to the container for delegation
    container.addEventListener('click', (event) => {
        const clickedImg = event.target.closest('.site-image');
        if (clickedImg) {
            const url = clickedImg.parentElement.dataset.url;
            const links = JSON.parse(clickedImg.dataset.links);

            if (links && links.length > 0) {
                event.preventDefault(); // Prevent default navigation
                showFlyoutMenu(event, links);
            } else {
                window.location.href = url; // Navigate to the stored URL
            }
        }
    });
}


function createMenu(config) {
    for (const menuKey in config) {
        if (config.hasOwnProperty(menuKey)) {
            const menuData = config[menuKey];
            // Use menuData to create your menu items
            // For example:
            const div = document.createElement('div');
            div.className = 'menu-item rounded-lg p-2 flex items-center justify-center';
            div.innerText = menuKey; // The key becomes the menu name

            div.addEventListener('click', () => {
                createImageSection(menuData, imageGrid);
                updateSelectedMenu(div);
            });

            menuBar.appendChild(div);
        }
    }
}
function populateMenuBar(config) {
    let isFirstItem = true;

    for (const menuKey in config) {
        if (config.hasOwnProperty(menuKey)) {
            
            const menuData = config[menuKey];
            const div = document.createElement('div');
            div.className = 'menu-item rounded-lg p-2 flex items-center justify-center';
	    if (isFirstItem) {
  		div.classList.add('selected-item'); // Add the 'selected-item' class to the first item
                createImageSection(menuData, imageGrid); // Also load the images for the first item
                isFirstItem = false;
	    }
	div.addEventListener('click', () => {
                createImageSection(menuData, imageGrid);
                updateSelectedMenu(div);
            });

            menuBar.appendChild(div);
        }
    }
}

function showFlyoutMenu(event, links) {
    // Create the flyout menu container
    const flyoutMenuContainer = document.getElementById('flyoutMenuContainer');
    flyoutMenuContainer.innerHTML = ''; // Clear previous content

    const flyoutMenu = document.createElement('div');
    // Tailwind classes for positioning and spacing
    flyoutMenu.className = 'absolute z-10 mt-5 flex w-screen max-w-xs px-4';

    // Calculate position
    const rect = event.target.getBoundingClientRect();
    const top = rect.bottom;
    const left = rect.left;

    flyoutMenu.style.position = 'absolute';
    flyoutMenu.style.left = `${left}px`;
    flyoutMenu.style.top = `${top}px`;

    // Create the inner content of the flyout menu
    // Tailwind classes for background, border, shadow, and more
    const content = document.createElement('div');
    content.className = 'w-full overflow-hidden rounded-lg bg-white text-sm leading-6 shadow-lg border border-gray-200';

    links.forEach(link => {
        const linkDiv = document.createElement('div');
        // Tailwind classes for layout and hover effects
        linkDiv.className = 'flex items-center p-4 hover:bg-gray-50';

        const linkAnchor = document.createElement('a');
        linkAnchor.href = link.href;
        // Tailwind class for typography
        linkAnchor.className = 'text-gray-900 font-semibold';
        linkAnchor.innerText = link.text;

        linkDiv.appendChild(linkAnchor);
        content.appendChild(linkDiv);
    });

    flyoutMenu.appendChild(content);

    // Append the flyout menu to the body and position it
    document.body.appendChild(flyoutMenu);

    // Optional: Close the flyout menu when clicking outside
    document.addEventListener('click', function closeFlyout(event) {
        if (!flyoutMenu.contains(event.target)) {
            flyoutMenu.remove();
            document.removeEventListener('click', closeFlyout);
        }
    }, { capture: true });
}


// Function to update the selected menu indicator
function updateSelectedMenu(selectedMenu) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('selected-menu');
    });
    selectedMenu.classList.add('selected-menu');
}

