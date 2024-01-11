const imageGrid = document.getElementById('image-grid');
const menuBar = document.getElementById('menu-bar');

function initializeApp(config) {
    populateMenuBar(config);
    createImageSection(config['personalImageMappings'], imageGrid); // Assuming 'personalImageMappings' is your default view
}

fetch('config.json')
    .then(response => response.json())
    .then(data => {
        // data now contains your JSON data
        createMenu(data);
    })
    .catch(error => console.error('Error loading JSON:', error));

function createImageSection(mappings, container) {
    container.innerHTML = ''; // Clear existing content
    for (const [url, { imgSrc, links }] of Object.entries(mappings)) {
        const div = document.createElement('div');
        div.className = 'group relative p-4 site-card rounded-lg shadow-lg flex flex-col items-center justify-center';

        const a = document.createElement('a');
        a.href = url;

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Image';
        img.className = 'site-image';

        a.appendChild(img);

        div.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from bubbling up to parent elements
            showFlyoutMenu(event, links);
        });

        div.appendChild(a);
        container.appendChild(div);
    }
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
    let firstMenuItem = null;

    for (const menuKey in config) {
        if (config.hasOwnProperty(menuKey)) {
            const menuData = config[menuKey];
            const div = document.createElement('div');
            div.className = 'menu-item rounded-lg p-2 flex items-center justify-center';
            div.innerText = menuKey.replace('ImageMappings', ''); // Simplify the name for display

            div.addEventListener('click', () => {
                createImageSection(menuData, imageGrid);
                updateSelectedMenu(div);
            });

            menuBar.appendChild(div);

            // Keep a reference to the first menu item
            if (firstMenuItem === null) {
                firstMenuItem = div;
            }
        }
    }

    // If there is at least one menu item, click the first one programmatically
    if (firstMenuItem !== null) {
        firstMenuItem.click();
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

function initializeApp(config) {
    populateMenuBar(config);
    createImageSection(config['personalImageMappings'], imageGrid); // Assuming 'personalImageMappings' is your default view
}

