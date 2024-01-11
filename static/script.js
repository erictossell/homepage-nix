const imageGrid = document.getElementById('image-grid');
const menuBar = document.getElementById('menu-bar');

function initializeApp(config) {
    populateMenuBar(config);
    createImageSection(config['personalImageMappings'], imageGrid); // Assuming 'personalImageMappings' is your default view
}

fetch('../config.json')
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

        const a = document.createElement('a'); // Create an anchor tag to wrap the image
        a.href = url; // Assign the URL to the anchor tag

        const img = document.createElement('img');
        img.src = imgSrc; // Make sure this path is correct
        img.alt = 'Image';
        img.className = 'site-image';

        a.appendChild(img); // Append the image to the anchor tag

        const button = document.createElement('button');
        button.className = 'mt-2 px-4 py-2 text-sm font-semibold text-gray-900 bg-white rounded-lg shadow';
        button.innerText = 'Links';
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from bubbling up to parent elements
            showFlyoutMenu(event, links);
        });

        div.appendChild(a); // Append the anchor to the div instead of img
        div.appendChild(button);
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

            if (menuKey === "personalImageMappings") {
                updateSelectedMenu(div); // Set the first menu as selected initially
            }
        }
    }
}


function showFlyoutMenu(event, links) {
    // Create the flyout menu container
        const flyoutMenuContainer = document.getElementById('flyoutMenuContainer');
    flyoutMenuContainer.innerHTML = ''; // Clear previous content

    const flyoutMenu = document.createElement('div');
    flyoutMenu.className = 'absolute z-10 mt-5 flex w-screen max-w-max px-4';

    // Calculate position
    const rect = event.target.getBoundingClientRect();
    const top = rect.bottom;
    const left = rect.left;

    flyoutMenu.style.position = 'absolute';
    flyoutMenu.style.left = `${left}px`;
    flyoutMenu.style.top = `${top}px`;
    // Create the inner content of the flyout menu
    const content = document.createElement('div');
    content.className = 'w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5';

    links.forEach(link => {
        const linkDiv = document.createElement('div');
        linkDiv.className = 'group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50';

        const linkAnchor = document.createElement('a');
        linkAnchor.href = link.href;
        linkAnchor.className = 'font-semibold text-gray-900';
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


// Populate menu bar and add click event listeners
Object.keys(menuBarMappings).forEach(menuId => {
    const div = document.createElement('div');
    div.className = 'menu-item rounded-lg p-2 flex items-center justify-center';
    div.innerText = menuId; 

    div.addEventListener('click', () => {
        createImageSection(menuBarMappings[menuId], imageGrid);
        updateSelectedMenu(div);
    });

    menuBar.appendChild(div);

    // Set the first menu as the selected one initially
    if (menuId === "Personal") {
        updateSelectedMenu(div);
    }
});
