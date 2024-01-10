const imageMappings = {
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

const imageGrid = document.getElementById('image-grid');

for (const [url, imgSrc] of Object.entries(imageMappings)) {
    const div = document.createElement('div');
    div.className = 'site-card rounded-lg shadow-lg p-4 flex items-center justify-center';

    const anchor = document.createElement('a');
    anchor.href = url;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Actual logo';
    img.className = 'site-image';

    anchor.appendChild(img);
    div.appendChild(anchor);
    imageGrid.appendChild(div);
}

