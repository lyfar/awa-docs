# AWATERRA Documentation

This website contains the comprehensive documentation for the AWATERRA platform - a meditation and mindfulness platform that connects users worldwide through mindful practices and community engagement.

Built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Live Documentation

🌍 **Live Site**: https://lyfar.github.io/awa-docs/  
📁 **Repository**: https://github.com/lyfar/awa-docs

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH (recommended):

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Documentation Structure

### Capabilities
High-level system capabilities and infrastructure components that power the platform.

### Features  
Detailed feature specifications for UI designers and developers.

### Roadmap
Development phases and version releases from MVP to full platform.

## Contributing

1. Make your changes to the documentation
2. Test locally with `npm start`
3. Commit your changes
4. Deploy with `npm run deploy`

## Features

- 📊 **Mermaid Diagrams**: Support for flowcharts, Gantt charts, and technical diagrams
- 🌙 **Dark/Light Mode**: Automatic theme switching
- 🔍 **Built-in Search**: Full-text search across all documentation
- 📱 **Responsive Design**: Works on all devices
- ⚡ **Fast Performance**: Static site generation for optimal speed