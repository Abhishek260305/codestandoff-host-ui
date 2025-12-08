# Host UI

Main host application for CodeStandoff 2.0 that orchestrates and loads child micro-frontend applications.

## Overview

This is the host application that uses Module Federation to dynamically load and integrate the following child applications:

- **dashboard-ui**: User dashboard and statistics
- **training-ui**: Training courses and practice problems
- **1v1-ui**: 1v1 competitive coding matches
- **playground-ui**: Code editor and execution environment
- **signup-builder-ui**: User registration and authentication

## Tech Stack

- Next.js 14 with TypeScript
- Tailwind CSS
- Module Federation (@module-federation/nextjs-mf)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start on http://localhost:3000

### Environment Variables

You can configure remote URLs via environment variables:

```bash
REMOTE_DASHBOARD_UI_URL=http://localhost:3001/_next/static/chunks/remoteEntry.js
REMOTE_TRAINING_UI_URL=http://localhost:3002/_next/static/chunks/remoteEntry.js
REMOTE_1V1_UI_URL=http://localhost:3003/_next/static/chunks/remoteEntry.js
REMOTE_PLAYGROUND_UI_URL=http://localhost:3004/_next/static/chunks/remoteEntry.js
REMOTE_SIGNUP_BUILDER_UI_URL=http://localhost:3005/_next/static/chunks/remoteEntry.js
```

### Building for Production

```bash
npm run build
npm start
```

## Remote Applications

Make sure the following remote applications are running:

- dashboard-ui on port 3001
- training-ui on port 3002
- 1v1-ui on port 3003
- playground-ui on port 3004
- signup-builder-ui on port 3005

## Repository

https://github.com/Abhishek260305/host-ui

