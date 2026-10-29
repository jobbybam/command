# Command

**Command** is a Windows desktop companion for **Fortnite: Save the World**. It brings missions, account information, inventory, party tools, and an interactive Storm Shield outpost viewer into one launcher.

> Command is an independent community project and is not affiliated with or endorsed by Epic Games. Use only accounts you own or are authorized to access. Epic endpoints and cloud-save formats can change without notice.

## Features

- **Missions and alerts** — browse available Save the World missions and mission alerts.
- **Account and inventory views** — inspect supported profile, schematic, survivor, and resource information returned by Epic's services.
- **Party tools** — view friends and party presence, with a promote action when supported by the active party and account permissions.
- **3D Storm Shield viewer** — orbit, pan, zoom, and reset the view; import/export compatible layout JSON.
- **Epic cloud-save loading (experimental)** — request Storm Shield save metadata, locate the matching cloud-storage record, download the save with the authenticated account token, and attempt to parse placed structure/trap coordinates for the viewer.
- **Remote assets** — load supported UI images from the configured asset host, with local asset fallback where available.
- **Automated checks** — Node's built-in test runner covers selected UI, API, asset, and parser behavior.

### Cloud-save limitations

Cloud-save parsing is experimental and must be validated against real account saves. The current port handles save discovery and a subset of placed actor coordinates; it is **not** a complete port of Penny Launcher's outpost subsystem. It does not yet reproduce Penny's full trap perk/rarity/level analysis or full extracted Fortnite meshes. A save download can succeed even when its contents cannot be parsed.

Party and profile API calls depend on Epic authentication, account state, permissions, and service availability. Passing local tests does not guarantee that a live Epic endpoint will accept every action.

## Requirements

- Windows for the intended packaged build.
- A compatible Node.js installation.
- Network access for dependency installation, authentication, cloud saves, and remote assets.

## Run from source

From the Command/ project directory:

    npm ci
    npm start

Run tests:

    npm test

Build the Windows installer and portable executable:

    npm run dist

The build command uses Electron Builder to produce artifacts under dist/. Build dependencies must be installed successfully before packaging. A source ZIP is not itself an installer.

## Asset hosting

Command can request UI assets from the configured remote asset host and can fall back to matching files in a local assets/ directory when present. Keep the expected directory structure intact, ensure the URLs are publicly accessible over HTTPS, and update the asset manifest when the available files change.

See [ASSET_HOSTING.md](ASSET_HOSTING.md) for setup notes.

## Project notes

- [Implementation notes for v0.2.42](IMPLEMENTATION-NOTES-0.2.42.md)
- [Party API notes](PARTY_API_NOTES.md)
- [Feature notes](FEATURES-0.2.40.md) and [earlier feature notes](FEATURES-0.2.39.md)

## Safety and project status

Command is a community-made companion, not an official Epic Games product. Do not share account tokens or credentials. Review any account-changing action before using it, and back up important local data before testing experimental features.

This repository is a source project. Check the implementation notes and automated test results before treating any feature as production-ready.
