const personalImageMappings = {
    "https://github.com": "imgs/github.png",
    "https://app.todoist.com/app/today": "imgs/todoist.png",
    "https://app.excalidraw.com/": "imgs/excalidraw.png",
    "https://192.168.2.195:8443": "imgs/actual.png",
    "https://mail.google.com/mail/u/0/#inbox": "imgs/gmail.png",
    "https://search.nixos.org/packages": "imgs/nixos.png",
    "https://login.tailscale.com/admin/machines": "imgs/tailscale.png",
    "https://aws.amazon.com/": "imgs/aws.png",
    "https://secure.backblaze.com/b2_buckets.htm": "imgs/backblaze.png",
    };

const workImageMappings = {
    "https://login.tailscale.com/admin/machines": "imgs/tailscale.png",
    "https://192.168.2.195:8443": "imgs/actual.png",
    "https://app.todoist.com/app/today": "imgs/todoist.png",
    "https://app.excalidraw.com/": "imgs/excalidraw.png",
    "https://mail.google.com/mail/u/0/#inbox": "imgs/gmail.png",
    "https://secure.backblaze.com/b2_buckets.htm": "imgs/backblaze.png",
    "https://github.com": "imgs/github.png",
    "https://aws.amazon.com/": "imgs/aws.png",
    "https://search.nixos.org/packages": "imgs/nixos.png"
};

const labImageMappings = {
    "https://login.tailscale.com/admin/machines": "imgs/tailscale.png",
    "https://192.168.2.195:8443": "imgs/actual.png",
    "https://app.todoist.com/app/today": "imgs/todoist.png",
    "https://app.excalidraw.com/": "imgs/excalidraw.png",
    "https://mail.google.com/mail/u/0/#inbox": "imgs/gmail.png",
    "https://secure.backblaze.com/b2_buckets.htm": "imgs/backblaze.png",
    "https://github.com": "imgs/github.png",
    "https://aws.amazon.com/": "imgs/aws.png",
    "https://search.nixos.org/packages": "imgs/nixos.png"
};
const menuBarMappings = {
    "Personal": personalImageMappings,
    "Work": workImageMappings,
    "Lab": labImageMappings,
    // ... other menu mappings
};

const imageGrid = document.getElementById('image-grid');
const menuBar = document.getElementById('menu-bar');

function createImageSection(mappings, container) {
    container.innerHTML = ''; // Clear existing content
    for (const [url, imgSrc] of Object.entries(mappings)) {
        const div = document.createElement('div');
        div.className = 'site-card rounded-lg shadow-lg p-4 flex items-center justify-center';

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = "_blank"; // Open links in a new tab

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Image';
        img.className = 'site-image';

        anchor.appendChild(img);
        div.appendChild(anchor);
        container.appendChild(div);
    }
}


// Initial population of the main image grid
createImageSection(personalImageMappings, imageGrid);

// Function to update the selected menu indicator
function updateSelectedMenu(selectedMenu) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('selected-menu');
    });
    selectedMenu.classList.add('selected-menu');
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
