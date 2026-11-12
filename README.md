# Horror Woods 2.0

**A top-down, horror-themed RPG prototype built with JavaScript and Phaser 3.**

**Status**: Work in Progress | Experimental Game Development

## Overview
Horror Woods is an independently developed 2D role-playing game project inspired by classic JRPG mechanics and top-down exploration.

Set in the mysterious town of Foreston, the game follows a young protagonist navigating an increasingly unsettling environment after an emergency alert disrupts everyday life.

The project combines exploratory game development with original worldbuilding, character concepts, and systems planning. It serves as a hands-on environment for developing JavaScript programming skills, game architecture, interactive environments, and gameplay mechanics.

This is an unfinished prototype, not a complete or production-ready game.

**This is an unfinished prototype, not a complete or production-ready game.**

## Technologies

| Technology | Purpose |
|---|---|
| JavaScript (ES6+) | Game logic and object-oriented programming |
| Phaser 3 | 2D game engine, scenes, sprites, animation, and physics |
| Tiled | Tilemap and environment design |
| Webpack | Development tooling and asset bundling |
| HTML5 | Browser-based game environment |
| Node.js / npm | Dependency management and development scripts |

## Implemented & Partially Implemented Features

### Game Architecture
- Modular, scene-based application structure.
- Boot, preloader, title, options, and credits scenes.
- Separate location scenes for Foreston and the player's house.
- Shared game settings model for music and sound preferences.

### Character Movement & Animation
- Keyboard movement using arrow keys and WASD.
- Directional walking animations.
- Sprite-based player and NPC classes.
- Physics bodies, movement boundaries, and collision handling.

### World & Environment Development
- Tilemap-based environment construction using Tiled.
- Town and interior scene development.
- Camera-follow and zoom functionality.
- Early implementation of room boundaries and location transitions.
- Map objects and spawn-point logic.

### User Interface & Audio
- Custom loading progress display.
- Interactive menu navigation.
- Music and sound settings.
- Animated menu elements.
- Credits presentation and audio playback logic.

### RPG Systems — Experimental
- Initial battle-scene and UI code.
- Early dialogue system experimentation.
- Character and enemy system planning.
- Foundational code for expanding the game's interactive mechanics.

Some systems are incomplete, disconnected, or require debugging before they can be considered functional gameplay features.

## Game Concept

Horror Woods takes place in Foreston, a small town surrounded by unsettling woodland environments.

After receiving an emergency alert, the protagonist, Fin, begins investigating strange events alongside characters including Dexter and Violet.

The planned experience combines exploration, environmental storytelling, character interaction, and RPG progression.

The game's design documentation outlines potential mechanics such as character attributes, equipment progression, combat encounters, consumable items, vendors, and story-driven events.

These narrative and gameplay concepts are part of the project's development roadmap and are not all implemented.

## Code Organization

The project uses an object-oriented structure to separate core game responsibilities.

**Scenes**
- Control loading, menus, locations, and gameplay environments.
- Organize different stages of the player experience.

**Sprites & Entities**
- Define reusable character behavior.
- Handle player movement, animation, and physics-related functionality.

**Model**
- Maintains shared settings for music and sound.

**Assets**
- Contains visual, audio, and map resources used during development.

This architecture provides a foundation for expanding the game without placing all gameplay logic in a single file.

## Development Roadmap

### Gameplay Systems
- [ ] Complete and debug combat functionality.
- [ ] Implement inventory, items, and equipment.
- [ ] Develop character attributes and progression.
- [ ] Implement party and follower systems.
- [ ] Expand enemy behavior and encounters.

### World & Interaction
- [ ] Complete Foreston and interior environments.
- [ ] Refine transitions between locations.
- [ ] Implement dialogue and NPC interactions.
- [ ] Expand interactive objects and events.
- [ ] Develop scripted story sequences and cutscenes.

### User Experience
- [ ] Refine gameplay UI and menus.
- [ ] Expand sound effects and environmental audio.
- [ ] Improve scene transitions and gameplay feedback.
- [ ] Test and debug existing systems.

## Running the Game Locally

Horror Woods currently uses a legacy development stack, including Phaser 3.20.1 and Webpack 4.

**Prerequisites: Node.js and npm**

### Installation

Clone the repository and install its dependencies:

```bash
npm install
```

### Start the Development Server

On macOS or Linux, run:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

Then open:

http://localhost:8080/

### Legacy Build Compatibility

The project currently uses Webpack 4, which can encounter the following error on newer Node.js versions:

```text
ERR_OSSL_EVP_UNSUPPORTED
```

The `--openssl-legacy-provider` flag allows the development server to run using legacy OpenSSL algorithms.

**Note:** This is a temporary development workaround. Updating the build dependencies and removing the compatibility flag are planned improvements.

### Current Development Status

The game is under active development. Scene initialization issues have been resolved, allowing the game to launch and enter Foreston.

Some gameplay features, including initial Player visibility, enemy spawning, and interior scene transitions, remain unfinished.

## Current Limitations

Horror Woods is an experimental prototype with incomplete gameplay systems.

- Combat and dialogue are not fully integrated.
- Inventory, equipment, and party systems remain planned.
- Some location transitions and interactions require additional work.
- Existing code may require debugging and dependency updates.

## Development Focus

This project demonstrates practical experience with:

- JavaScript and object-oriented programming
- Game development with Phaser 3
- Scene and application architecture
- Sprite animation and player input
- Physics and collision handling
- Tilemap-based world development
- Interactive UI development
- Gameplay systems planning and prototyping

## Credits & Attribution

Horror Woods was developed using the Phaser 3 ecosystem and the Phaser 3 Webpack Project Template by photonstorm.

The project includes third-party music, sprites, fonts, and other development assets. See the in-game credits and asset documentation for applicable attribution.

Before redistribution, verify the licensing and permitted use of all third-party assets.

## License

The repository includes a GNU General Public License v3.0 file. See `LICENSE` for details.

Currently utilizing the Phaser 3 Webpack Project Template provided by photonstorm (https://github.com/photonstorm/phaser3-project-template)

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

### Run

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |
