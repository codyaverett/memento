# Leadership beyond the management track

Moving up the ladder in your technical career will lead to you having less time to work on more challenging problems.

Staff Engineer job functions typically overlap with engineer director roles.

## Work on what matters 
- p.35
- Different types of work are valued by different types of organizations
- Focus on the work that matters to your organization and to yourself
- Being the "glue" in your organization is not typically valued because it is less tangible than changes actually happening
- Important work sometimes goes unnoticed because leadership does not value all work the same.  It varies from leader to leader.
	- e.g. Improving developer experience and tooling to improve overall development throughput
	- e.g. Glue work, making sure teams are aligned on common goals
	- e.g. Introducing new technologies
	- e.g. Tightly coupling modules
	- e.g. Automated testing
- Sometimes a failing app is one code change away from being a success

## Write an engineering strategy
- p.43
- To write an engineering strategy:
	- Write five design documents, and pull the similarities out.
- To write an engineering vision:
	- Write five engineering strategies, and forecast their implications two years into the future.
- Leave all your "most brilliant" ideas out of these documents

### When and why?
When and why should you actually have a strategy?

- Strategies are tools of proactive alignment that empower teams to move quickly and with confidence.
- Empower others to make quick confident decisions
- Strategies narrow your many possible futures down enough so it's possible to derive a realistic vision
- Rehashing conversations a few times in a week is an indicator that a strategy needs to be written up
- When the future is too hazy to identify investments worth taking, that calls for another vision to be written.

### Write five design docs
- Describe decisions and tradeoffs you've made in specific projects
- A good design doc
	- describes a specific problem
	- surveys possible solutions
	- explains the selected approach's details
- A general rule of thumb is that you will want a design doc when multiple future projects will depend on the one you are working on now.
- Write them for projects that meaningfully impact your users
- Write them for any work taking more than a month of engineering time
- Recommendations as you write:
	- Start from the problem
		- The clearer the problem, the clearer the solutions
		- If solutions don't immediately come to mind clarify the problem
		- If you are stuck articulating the problem, ask a group of peers what is missing
	- Keep the template simple
		- Prefer minimal templates
		- Let people choose the sections that make the most sense for their project
		- Only require exhaustive details for the riskiest projects
	- Gather and review together, write alone
		- Most people are better writers than editors
		- Don't fall in love with what you've written until after people have reviewed it
	- Prefer good over perfect
		- Better to get a good document in front of people sooner instead of a marginally better document
		- Focus on pushing design documents to be good rather than setting a high bar others may not be able to reach yet

Reread your documents after you are finished implementing them and see where the implementation deviated from the plan.  This will help you improve your future design docs.

### Synthesize those five design docs into a strategy
- Good strategies guide tradeoffs and explain the rationale behind them
- Bad strategies state a policy without explaining
	- decoupled from context
	- more and more difficult to understand
	- Read "A Framework for Responsible Innovation"
	- Read "How Big Technical Changes happen at Slack"
- Advice for writing a strategy document:
	- Start where you are
		- Don't overthink the problem, you will need to revisit and rewrite bad sections
	- Write the specifics
		- Write until you start to generalize, then stop
		- Specific statements create alignment; generic statements create the illusion of alignment
	- Be opinionated
		- Opinions provide clarity on decision making
	- Show your work
		- Show why you chose specific frameworks
		- Show why your decisions are good tradeoffs, etc.

### Extrapolate five strategies into a vision
Having a lot of strategies might make it difficult to reason about how they will interact.  But it is necessary to weave them together to form an effective strategy.

- Write two to three years out
	- Technologies change quickly
	- Try to focus 2-3 years out unless you are a fairly established company
- Ground in your business and in your users
	- Avoid a view that clashes with your business leadership
- Be optimistic rather than audacious
	- Visions should be ambitious, but should also be possible
	- Do write what you could do if everything goes to plan
	- Don't write what you think would be possible with infinite resources
- Stay concrete and specific
	- generic statements are easy to agree with but don't help reconcile conflicting strategies.
	- details in visions are illustrative rather than declarative
	- give a taste of the future's flavor rather than offering a binding commitment
- Keep it one to two pages long
	- Most people don't read long documents
	- Force yourself to write something compact, reference extra context by linking external documents for those that want further context