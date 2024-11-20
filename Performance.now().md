---
tags:
  - "#Perf"
  - "#A11Y"
---
<sub>akamai2024</sub>
# Speakers
---
## Annie Sullivan
### Aiming for the stars
---
> [!hint]- Direction
> #### Have a Northstar
> Have a goal
> ##### Represent the ux
> Think about the **critical** user journey
> ##### Custom Critical User Interactions
> - Long animation frames API
> - Event timing
> - Element timing
> - User timing marks/measures
> ##### Measuring for real users
> - Real user monitoring
> - Chrome User Experience Report
> - DevTools throttling or low end devices
> use performance.mark and performance.measure
> ##### Get awesome at experimenting
> Rip things out
> Iterate
> Most providers have a/b testing solutions
> ab testing instant page with netlify and speedcurve
> [vodafone](https://web.dev/case-studies/vodafone)
> ##### Contribute to the community
> [e18e](https://e18e.dev)
## Daniel Roe
### The bundler space
---
> [!info]- Javascript is **useful**
> #### Style inlining
> #### Web font optimisation
> removes connections & privacy issues
> configures whether var fonts are loaded or which weights are used.
> fallback fonts are adjusted to the main one with size adjust and the other overrides
> #### Chunking async refreshes
> #### Third party scripts
> defer loading until interactive
> bundling third party scripts at build time
> #### Rebundling initial load
> #### Removing polyfills
> replaces polyfills with native solutions
> #### Script reduction
> create rules for routes that shouldn't run scripts
## Paul Williams & Jason Williams
### Bloomberg becomes browser
> [!hint] Bloomberg
> Temporal for standard JS
> Container timing attribute
> bloomberg github for above attribute
## Mandy Michael
### Fonts
---
> [!info]+ Text
> System fonts > Web fonts
> #### Font hosting
> Self hosted > Third party
> #### Variable fonts
> Eliminates the need for multiple font files
> #### Displaying fonts
> font-display
> - swap
> - block
> - fallback
> - optional
> ##### [size-adjust](https://meowni.ca/font-style-matcher/)
> changes the x-height
> ##### font-size-adjust
> #### Font loading
> cache your fonts
> (cache control) Inline font css but use with caution
## Alex Russell
### I want the web to win
---
> [!hint]+ The Web Is Unique
> - Safe
> - Fresh
> - Frictionless
> - Interoperable ??
> - User-mediated
> - Gatekeeper-free
> - Standards-based
> - Open Source friendly

## Jason Grigsby
### Third Party Woes
---
> [!info]- Third Party Woes
> <sub>JS provided by external sites or services</sub>
> #### How to analyze third party script performance
> ##### Which third parties are being used
> How can I find out?
> With request map generator
> 
> #### What can you do with this information
> Have a conversation:
> - is the script; 
> 	- necessary
> 	- a duplicate of another script
> 	- deprecated
> 	- needed on every page
> - can we self host it?
> - can we execute the script on the server or edge
> - can we defer 
> - can we use facade to only load when necessary
> #### Some newer options?
> ##### Partytown
> Works on a worker thread, away from the main thread.
> ##### Zaraz
> Runs third party scripts on the edge, at the end of the cdn.
> ##### GTM
> Has a server-side option
> - setting this up is complex
> ##### Yottaa
> ##### HTTParchive Core web vitals technical report
> - Most decent way of comparing third party providers
> #### A call to action
> **Require timing-allow-origin** headers for any third-party scripts
> Make it easier for site owners to **compare the performance** of third-party scripts
## Anna Migas
### Web performance
---
> [!info]- UX connected to the web performance
> #### Context (African landscape)
> For some users, the good web performance is not achievable at all.
> #### The reasons for bad web performance in certain conditions
> ##### Networking
> - Latency in most parts of Africa is really high.
> - Connectivity is not great.
> ##### End user device compute
> - Nigeria for example; is a mobile first country.
> - Parse/Compile can take 2-5x longer on a mobile device compared to a desktop device.
> #### Visibility of system status
> The design should keep the user informed about the status of the page, such as;
> - loading
> - downloading
> ##### Take into account digital literacy
> - Use simple language
> - Discourage damaging actions
> Possibly with an estimated time if applicable.
> Also inform about errors and how to possibly fix these.
> #### Leverage Progressive Enchancement
> Make it easy to achieve crucial actions first, extra features should be secondary.
> #### Avoid request chaining and roundtrip (RTT)
> - Prefetch only necessary items
> - Serve static resources to avoid redownloading
> - Test for back/forward cache
> - Optimise image loading;
> 	- use correct and modern formats
> 	- use tools to optimise these
> 	- add size/aspect ratio to avoid layout shifts
> - Use native lazy loading
> Learn about network client hints
> - Network Information API helps web applications to access information about the user's network and device.
> ##### For react
> - Adaptive loading hooks
> Limit third party resources
> - Load them async if and when possible
> ##### For Webpack
> SplitChunksPlugin
> ##### Consider using service worker
> ##### Avoid creating too many layers
> - Consider using virtualization for huge amounts of items
> ##### Break long tasks
## Paul Calvano

### Performance mistakes
---
> [!bug]- Common mistakes
> and their fixes!
> ### Lazy loading LCP images
> - Don't use lazy load on LCP-Image
> ### Resource Hints
> preconnect if the domain is used on the same page
> if the domain is needed early on the page, preconnect should occur earlier (resource hint)
> ### Preconnect with preloads
> preload if you need it early, avoid using it too much, it wil delay high prio resources
> only preload LCP image
> ### Unused preloads
> for font preloads use `as="font"`
> ### Compression
> Brotli > Gzip compression
> ### Image optimization
> automate this
> ### Image compression
> Don't compress first party images
## Eric Bailey

### Perf 🤝 A11Y
---

> [!hint]+ Accessible object
 > - Name
 > - Role
 > - Properties
 > - Description

> [!error] Writing semantic HTML

> [!hint]+ Optimal DOM tree
> - Max depth of 32 nodes

> [!warning] Redundant entry

## Harry Robberts
- Increase confidence
- Have a plan of attack
- Agree; commit
### Site-speed that sticks
---
#### Metrics
- KPIS
	Definition + target
	Common goals
	Core web vitals
- Enablers
	Metrics that directly influence kpis
	ttfb
	input delay
- Predictors
	Signals of good/bad performance
	- great for root-causing
#### Localhost
- won't have GTM for example
- Experiment with custom throttling in the network tab
- slow down the backend in localhost
- slowfiles (render blocking)
- core web vitals are too big for localhost
	- working locally? measure locally
#### Bare-metal metrics
- Bench mark yourself
	- for example inline vs external css
#### Backstops <sub>& budgets</sub>

#### Monitoring
#### Playbook

## Tammy Everts
### A11Y & performance
96.3% of pages fail the WCAG guidelines
### Website sizes
Both JS & Video's make up for a large part of resource sizes on pages.

### Dunning-Kruger effect
Cognitive bias;
high performance feels like low and vice-versa

## Links
speedcurve.com/web-performance-guide/
[har.fyi](https://har.fyi)
[Eliminate content repaints with the new layers panel](https://blog.logrocket.com/eliminate-content-repaints-with-the-new-layers-panel-in-chrome-e2c306d4d752/)
[wakamaifondue](https://wakamaifondue.com)
[source foundry](https://github.com/source-foundry/slice)
[subsetting](https://subsetting.xyz)
glyphhanger on github
tools.paulcalvano
[Incremental Font Transfer](https://www.w3.org/TR/IFT)