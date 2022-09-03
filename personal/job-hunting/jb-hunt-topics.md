---
tag: interview
---

# General Javascript knowledge questions

Hi, My name is Cody Ave-Rett
I'm coder at heart and and love doing Cody things
My mom always knew I would grow up to be a coder.

I live in rogers with my wife, 2 doggos and 2 cats
Pricilla, Peanut, Pascal, and Panko

I like geeking out over code, music theory, space things (star power, spaceship earth), and I like anime (I'm in the middle of rewatching all 1000 episodes of Naruto)

I have a lot of general programming experience at high and low levels of code, but I enjoy working on UI and UX the most.

.. yeah
Thanks for the opportunity to chat with you about this role.
I've read through all the topics you all planned for us today and I'm ready to get started!

Should we start from the top and work our way down?

# React Native questions
I've only dabbled with react native, I've created simple test projects for IOS and Android before.
I like to say that expert with react and I've been using it since 2017.
I've read about react native for web too which is a compatibility layer.

# Component Design
- I like small focused components that can either be reused or replaced easily
- Smaller components are usually simpler to test
- I also like breaking my code down into reusable modules (I like the module approach because the code can be self contained and inputs/outputs can be more easily reasoned about and replaced)
- I'm a huge fan of MonoRepos for that reason too. (Lerna, Yarn Workspaces, and PNPM workspaces).  Monorepos also allow me to maintain a common toolset across all my packages.
- I like to separate visual/presentation components from stateful components when possible since visual style is something that could change and be tested separately from the more logical components

## State Management
- How do you track state changes between ... all user interactions
- It's a very opinionated space sometimes :D
- But yeah, like when someone clicks on a button what is supposed to happen, etc.
- Redux / Sagas
	- Actions > Reducers change state > View updates with new state
	- aggregated reducers at a global level
	- Side-effects managed with redux sagas
	- Became unwieldy with Sagas because any action that was triggered could
	- Redux DevTools and time traveling debugging are epic and very useful to visualize changes to state over time
	- I used redux when before they reduced the amount of boilerplate code required to add new state objects
- MobX
	- A more direct way to store and interact with state
	- It's a more imperative approach, which can make some functions 
	- It's also extremely performant at managing state updates
	- Behind the scenes uses Javascript proxies to update only the components that need state change updates
- State Machines
	- A state machine is _a way of modeling program state so that a program will always be in exactly one state at any one time_.
	- Changes in state
	- Libraries
		- [XState](https://xstate.js.org/) 
		- [MST or mobx state tree](https://github.com/mobxjs/mobx-state-tree)
- Hooks and local state
	- [Constate](https://github.com/diegohaz/constate) (Global/Relative provider for hook based state management)

## Navigation
- Web navigation via routers (I've used several routing libraries, but have also made my own simple systems back in the JQuery days that would redirect based on the last URL hash state)
- Encode state in the url parameters 
- [Web history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
	- window.history.back() or .go(-1)
	- window.history.forward() or .go(1)
	- window.history.go(0) to refresh the page
- React Native 
	- Navigation Container
		- Navigation Stack (Stack Navigator)
		- Stack Screens with `name` and `component` props
		- e.g. on button press `this.props.navigation.navigate('name');`
		- Documentation recommends to now use react context with a Provider wrapping around your screens to share state between screens

## Native Considerations
- Multiple types of client devices of various sizes and specifications
- Device orientations.. component layout changes
- Cannot guarantee that the user will always have a persistent connection (Same with mobile web app) so is there some offline data store that provides the user with some limited functionality or does the app allow users to locally queue up 
- I imagine with a logistics company there are some very spotty connection areas
- Code reuse across different platforms (IOS, Android, Desktop)

## Upgrading RN
- Haven't done this personally but read up on it
- Upgrade process
	- Expo (upgrade react-native react and expo packages)
	- React Native CLI
	- Or use Upgrade Helper
- I'd make sure to read the official upgrade guides and change logs for the project
- Usually it's simpler to keep projects up to date to make future upgrades simpler

## Expo or bare
- Do you want a managed or unmanaged workflow?
- I would compare this to using Create React app OR ejecting CRA OR creating your own workflow from scratch
- Managed workflows can be limiting and could lead to situations where 

# General mobile

## differences between mobile vs non-mobile development
- Web development and browser APIs
- Different SDKs
- mobile development offers SDKs
- 
## Push Notifications
- Web push notifications can be set up through the Browser APIs and need explicit permissions from the user to allow notifications
- Progressive Web Apps (service worker for push notifications when the webpage isn't even open)
- Native permissions are requested when user installs the application usually

## Analytics
- I'd start with the question what are you trying to discover?
- How people are using your application
- Visual heatmaping
- Api usage
- Aggregate application logging and use a dashboarding system like Prometheus or Graphana 
- Google cloud logging (Very nice)

## Storing on the device vs on remote database
- What type of garuntees need to be made about the data?
- If the person were to lose the device would losing the data matter (e.g. account balance vs user preference settings and color schemes)
- Different ways to classify data
  
## biometrics
- Native modules handle biometrics
- Found a Library ([react-native-fingerprint-scanner](https://github.com/hieuvp/react-native-fingerprint-scanner))
- Provide Fingerprint, Touch ID, and Face ID Scanner for React Native (Compatible with both Android and iOS)

# Testing Experience

## Unit vs Integration
- This is a question about what you are testing? Why are you testing it?
- Unit testing is more about testing the logic of local isolated functions
- Integration tests are bigger in the grand scheme of things.. testing two or more units together

## Suggested coverage percentage
- In an Ideal world you'd have 100% coverage and you'd know exactly how everyone could possibly use your application and API
- Things usually aren't ideal so I recommend doing the best you can with what you know at the time.
- There can still be situations that are missed, so whenever a bug or regression is found, make sure there is a test case to cover those situations

## Any TDD experience
- Yes, not my default method of coding, but it was enjoyable to try
- I liked using this Visual Studio Extension called Wallaby to help me visualize my test coverage and show me directly in my editor which lines were tested and which lines were failing
- Red green refactor
- Combine with behavior driven development (How is this thing going to be used)

## Any pre-hook checks?
- Absolutely!
- Git pre-hook checks installed locally (I've used a package called husky, but I'm familiar with the files that git uses to create these)
- I like to have a code linter step and test cases run here so code isn't pushed up to a branch
- Are you all using Git (distributed) or Team Foundation Version Control (TFVC)
- I'm not very familiar with TFVC

## Automated Testing Experience
- The tests we'd run manually should be ran in the CI pipeline
- I've used my CD pipelines to do simple Smoke Tests to make sure my web applications are at least loading

## PR Review Experience
- This is where you can learn from your teammates as well as help them grow 
- Large PRs are terrriiible, they slow down code review process and in general make teammates unhappy
- Try to keep PRs on the smaller side and focused on one problem
- Try not to be too picky about syntax because linting tools and code formatters should ideally be linked up 
- Call out code complexity or hard to understand logic
- People should use comments more because code is meant to be read by other humans

## Automated Pipeline Experience
- I did development work on some automated pipelining tools and infrastructure. (Concord.walmartlabs.com)
- Flow visualization
- Yaml syntax to describe the CI and CD process
- Walmart Security team integrated CheckMarkx integration in our CI process to call out any known vulnerabilities or concerns with our code 

## Node dependency maintenance
- General security updates are usually fine, but I like to be explicit about my package versioning.  
- I don't like depend on package manager lockfiles and trusting 3rd parties to use Semantic Versioning correctly
- Be very careful when updating major versions
- Be careful in general when upgrading because of breaking changes
- Be careful about package integrity too because someone could overwrite an already published version with different code (maybe malicious)

## Experience with Technical Design
- UML diagrams for class design
- Figma/Sketch/Adobe XD for UX (I really like using visual collaboration tools)
- MermaidJS for simpler flow diagrams written in markdown

# My Questions
- How many people usually work from the office now?
- How many teams do you work with?
- How do you collaborate and coordinate with other teams?
- If you hire me today, how will you know in a year's time that I was the right fit?