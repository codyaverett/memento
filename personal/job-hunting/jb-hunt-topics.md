# General Javascript knowledge questions
# React Native questions

# Component Design
- I like small focused components that can either be reused or replaced easily
- I also like breaking 

## State Management
- Redux / Sagas 
	- Became unwieldy with Sagas 
- MobX
- StateMachines
- Hooks and local state

## Navigation
- Web navigation via routers (I've used several routing libraries, but have also made my own simple systems back in the JQuery days that would redirect based on the last URL hash state)
- Encode state in the url parameters 
- Web history API

## Native Considerations
- Multiple types of client devices of various sizes and specifications
- Cannot garuntee that the user will always have a persistent connection (Same with mobile web app)

## Upgrading RN
## Expo or bare
- Maged or unmanaged workflow
- kinda similar to Create React app and ejecting or creating your own workflow from scratch
- Managed workflows can be limiting and could lead to situations where 

## General mobile

## differences between mobile vs non-mobile development
- web development
- mobile development offers SDKs
## Push Notifications
## Analytics
- What are you trying to discover
## Storing on the device vs on remote database
- What type of garuntees need to be made about the data?
- If the person were to lose the device would losing the data matter (e.g. account balance vs user preference settings and color schemes)
- Different ways to classify data
  
## biometrics
- Native modules handle biometrics
- Provide Fingerprint, Touch ID, and Face ID Scanner for React Native (Compatible with both Android and iOS)
- Library ([react-native-fingerprint-scanner](https://github.com/hieuvp/react-native-fingerprint-scanner))

## Testing Experience

## Unit vs Integration
- This is a question about what you are testing
- Unit testing is more about testing the logic of local isolated functions
- Integration tests are bigger in the grand scheme of things.. testing two or more units together

## Suggested coverage percentage
- In an Ideal world you'd have 100% coverage
- There can still be situations that are missed though, so whenever a bug or regression is found, make sure there is a test case to cover those situations

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

## Automated Testing Experience
- The tests we'd run manually should be ran in the CI pipeline
- I've used my CD pipelines to do simple Smoke Tests 

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

## Node dependency maintenance
- General security 
- Semantic versioning
- Be careful when updating major versions

## Experience with Technical Design
- UML diagrams for class design
- Figma/Sketch/Adobe XD for UX (I really like visual tools)
- MermaidJS for simpler flow diagrams written in markdown
