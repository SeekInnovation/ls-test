# Learningsuite Repo

This is a Monorepo for the LearningSuite built and distributed by SeekInnovation.

**Table of contents**

- [Learningsuite Repo](#learningsuite-repo)
- [Assignment instructions](#assignment-instructions)
- [Requirements](#requirements)
- [Getting Started:](#getting-started)
- [Installation of packages](#installation-of-packages)
- [NX Docs (workspace)](#nx-docs-workspace)

<br/>

## Assignment instructions
Your Assignment is to build a Kanban-Board, like in Trello where the user is able to drag and drop cards between lists (columns).

This is a great UI example built in React & Material UI: [https://minimals.cc/dashboard/kanban](https://minimals.cc/dashboard/kanban)

<br/>

## Requirements

- Drag and drop (DND) is a must have
- Add a new Card to a column
- Drag a card to another column
- Sorting cards via DND should also work
- Changing Card or Column title is NOT required
- Deleting a Card is NOT required
- Showing images is a nice to have but is not required

<br/>

## Tipps
- For drag and drop you can use `react-beautiful-dnd` ([https://docs.dndkit.com/](https://docs.dndkit.com/)) (it needs to be installed in this monorepo)
- Structure the current state of the columns and cards so that the state is serializable as JSON (storing and loading is not required)

<br/>

## Getting Started:

First go to the project root and run `yarn` and `yarn start`. Further reading on how to use this workspace: [NX Docs (workspace)](./docs/NX_docs.md)

<br/>

## Installation of packages
Packages are only and really ONLY installed in the root folder!! So go to root and run `yarn add <package-name>` or for dev packages `yarn add -D <package-name>`

<br/>

## FYI: Documentation of this Mono Repo
[NX Docs (workspace)](./docs/NX_docs.md)
