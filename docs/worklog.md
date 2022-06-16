
# Setup
Installed nvm to manage multiple installations of node.js, specifically old/out-of-maintenance versions like Node.js 12.
TODO shouldn't a startup use up-to-date stuff and not node.js versions which are already past end-of-life (Node.js 12 is from April 2019, last LTS update 2022-04-05)? but this is just some dummy project to test people I guess.

Installed yarn: https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable

Installed project dependencies using `yarn install`.

To learn how to work with the project setup, I opened the Nx CLI docu.
https://nx.dev/using-nx/nx-cli
The default workspace was 'ovb-mobile', so I guess a previous product of the company was this app?
I changed it to the kanban one.
TODO fix this in base repo
TODO should it be documented how the project can be used or should potential colleagues try to make themselves familiar with the project themselves.

The `tasksRunnerOptions` are configured to run in the cloud, with a pre-configured accessToken which creates builds which I have no access to.
So I tried to change those to local builds using the docs at https://nx.dev/configuration/projectjson.
However, 'nx/tasks-runners/default' is apparently only a property value for newer versions of this nx tooling.
TODO fix that stuff in base repo, maybe update versions overall.
I then simply removed the configuration, cos I assumed correctly that the defaults would make a local build.
`nx build-storybook` worked fine then.

I then started the application locally using `nx storybook`.
I started to play around with the debugging functionality of IntelliJ Ultimate, it worked very nicely out-of-the-box.
I installed the React Dev Tools Chrome plugin to have a nice component inspector.

# Learning
Now that I learned how I can actually work with the project, I started to read the documentation and play around.

Like daaaaamn, JSX is a great feature to incorporate XML-style structures in code.

https://www.typescriptlang.org/docs/handbook/2/functions.html

TODO inform about storybook
https://storybook.js.org/

To find out which docs to read, I inquired about the used versions using the dependency tree of `yarn list`.
Inspecting the `yarn.lock` file would have been even more reliable I guess.
React: 17.0.2

First I read the documentation on the major concepts of React,
then many of the 'Advanced Guides'.
Finally I read the docs on hooks.
I left out the testing for now. I am going to research that later.
I won't do TDD for now while only experimenting and doing this basic assignment.

Note the cool hooks here: https://react-typescript-cheatsheet.netlify.app/docs/basic/useful-hooks

# Slowly starting implementation
I didn't like that TypeScript wasn't in strict mode, so I changed that.