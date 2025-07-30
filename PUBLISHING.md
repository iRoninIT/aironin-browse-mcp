# Publishing Guide: aiRonin Browse MCP

## Overview

This guide covers publishing the aiRonin Browse MCP server for easy installation via `uvx` or `npx`.

## Publishing Options

### **Recommended: `uvx` (GitHub-based)**

- ✅ **Easier**: Direct from GitHub repository
- ✅ **No npm account**: Can publish immediately
- ✅ **MCP Standard**: Most MCP servers use this approach
- ✅ **Version Control**: Uses git tags for versioning

### **Alternative: `npx` (npm-based)**

- ✅ **Wide Distribution**: Available on npm registry
- ✅ **Version Management**: npm versioning system
- ⚠️ **Requires npm account**: Need to publish to npm
- ⚠️ **More Setup**: npm publishing process

## Publishing with `uvx` (Recommended)

### Step 1: Prepare Repository

1. **Ensure clean build**:

   ```bash
   cd aironin-browse-mcp
   pnpm build
   ```

2. **Update version** (if needed):

   ```bash
   # Update version in package.json
   # or use npm version patch/minor/major
   npm version patch
   ```

3. **Create git tag**:
   ```bash
   git add .
   git commit -m "Release v1.0.0"
   git tag v1.0.0
   git push origin main --tags
   ```

### Step 2: Publish to GitHub

1. **Create GitHub repository** (if not exists):

   - Repository: `iRoninIT/aironin-browse-mcp`
   - Public repository
   - Add README.md

2. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/iRoninIT/aironin-browse-mcp.git
   git push -u origin main
   git push --tags
   ```

### Step 3: Installation for Users

Users can now install via `uvx`:

```bash
# Install latest version
uvx --from git+https://github.com/iRoninIT/aironin-browse-mcp aironin-browse-mcp

# Install specific version
uvx --from git+https://github.com/iRoninIT/aironin-browse-mcp@v1.0.0 aironin-browse-mcp
```

### Step 4: MCP Configuration

Users add to their MCP configuration:

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "uvx",
      "args": [
        "--from",
        "git+https://github.com/iRoninIT/aironin-browse-mcp",
        "aironin-browse-mcp"
      ]
    }
  }
}
```

## Publishing with `npx` (Alternative)

### Step 1: Prepare for npm

1. **Update package.json**:

   ```json
   {
     "name": "aironin-browse-mcp",
     "version": "1.0.0",
     "bin": {
       "aironin-browse-mcp": "dist/server.js"
     },
     "files": ["dist/", "README.md", "LICENSE"]
   }
   ```

2. **Add shebang to server.js**:
   ```javascript
   #!/usr/bin/env node
   // ... rest of server code
   ```

### Step 2: Publish to npm

1. **Login to npm**:

   ```bash
   npm login
   ```

2. **Publish**:
   ```bash
   npm publish
   ```

### Step 3: Installation for Users

Users can install via `npx`:

```bash
# Install globally
npm install -g aironin-browse-mcp

# Or use npx
npx aironin-browse-mcp
```

### Step 4: MCP Configuration

```json
{
  "mcpServers": {
    "aironin-browse": {
      "command": "aironin-browse-mcp"
    }
  }
}
```

## Release Process

### For `uvx` Publishing

1. **Update version**:

   ```bash
   cd aironin-browse-mcp
   npm version patch  # or minor/major
   ```

2. **Build and test**:

   ```bash
   pnpm build
   pnpm test
   ```

3. **Commit and tag**:

   ```bash
   git add .
   git commit -m "Release v1.0.1"
   git tag v1.0.1
   git push origin main --tags
   ```

4. **Update documentation**:
   - Update README with new version
   - Update installation instructions
   - Update changelog

### For `npx` Publishing

1. **Update version**:

   ```bash
   npm version patch
   ```

2. **Build and test**:

   ```bash
   pnpm build
   pnpm test
   ```

3. **Publish**:

   ```bash
   npm publish
   ```

4. **Update documentation**:
   - Update README with new version
   - Update installation instructions
   - Update changelog

## Version Management

### Semantic Versioning

- **Patch** (`1.0.0` → `1.0.1`): Bug fixes
- **Minor** (`1.0.0` → `1.1.0`): New features, backward compatible
- **Major** (`1.0.0` → `2.0.0`): Breaking changes

### Git Tags

```bash
# Create version tag
git tag v1.0.0

# Push tag to GitHub
git push origin v1.0.0

# List tags
git tag -l

# Delete tag (if needed)
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

## Distribution Channels

### Primary: GitHub + uvx

- **Repository**: `https://github.com/iRoninIT/aironin-browse-mcp`
- **Installation**: `uvx --from git+https://github.com/iRoninIT/aironin-browse-mcp aironin-browse-mcp`
- **Updates**: Git tags for versioning

### Secondary: npm + npx

- **Package**: `aironin-browse-mcp`
- **Installation**: `npm install -g aironin-browse-mcp`
- **Updates**: npm versioning system

## User Installation Guide

### Quick Start (uvx)

```bash
# Install latest version
uvx --from git+https://github.com/iRoninIT/aironin-browse-mcp aironin-browse-mcp

# Add to MCP configuration
echo '{
  "mcpServers": {
    "aironin-browse": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/iRoninIT/aironin-browse-mcp", "aironin-browse-mcp"]
    }
  }
}' > .cursor/mcp.json
```

### Quick Start (npx)

```bash
# Install globally
npm install -g aironin-browse-mcp

# Add to MCP configuration
echo '{
  "mcpServers": {
    "aironin-browse": {
      "command": "aironin-browse-mcp"
    }
  }
}' > .cursor/mcp.json
```

## Troubleshooting

### Common Issues

1. **Build fails**:

   ```bash
   pnpm install
   pnpm build
   ```

2. **Git tag issues**:

   ```bash
   git tag -l  # List existing tags
   git tag -d v1.0.0  # Delete tag if needed
   ```

3. **npm publish issues**:

   ```bash
   npm whoami  # Check login
   npm login   # Login if needed
   ```

4. **uvx installation issues**:

   ```bash
   # Check uvx installation
   uvx --version

   # Try direct installation
   uvx --from git+https://github.com/iRoninIT/aironin-browse-mcp aironin-browse-mcp
   ```

## Next Steps

1. **Choose publishing method** (recommend `uvx`)
2. **Set up GitHub repository**
3. **Create initial release**
4. **Update documentation**
5. **Announce availability**
