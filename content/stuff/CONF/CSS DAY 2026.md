# Speakers

## Day 2
> [!important]
> ## [Kevin Powell](https://kevinpowell.co/talks/css-is-eating-js)
> **CSS is eating JS**
> inline css variables obscure the flow of data
> using attr() makes this clears this up since we can look at the data-* attribute
> - no internationalization and can't search for/select (with cursor?)
> (modern) attr() can now be used with any property but values get passed as a string so it won't apply as a number
> instead we can apply a `type(<number>)` like this;
> ```css
> --col-count: attr(data-column-count type(<number>))
> ```
> 
> instead of a type you can also assign a value; for example setting px/rem/lh will likewise convert it to px/rem/lh
> 
> custom attributes are valid too
> 
> *where else can you assign type()? [how well is it supported*](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/type#:~:text=In%20addition%2C%20the%20%7C%20token%20can%20be%20used%20as%20a%20separator%20when%20specifying%20multiple%20values%20or%20combining%20%3Cident%3E%20and%20%3Csyntax%2Dtype%3E%20values%20for%20the%20expected%20syntax.)
> 
> [`reading-flow: grid-rows;`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/reading-flow) for tab order when using `order: ...;` to help with keyboard controls (cool)
> 
> rathern than setting names per element we can set a `attr(data-id type(<custom-ident>))` for view transitions
> 
> we can use media queries and style queries in if()
> 
> attr() has some rules around urls;
> 

> [!important]
> ## Patrick Brosset
> **Fun with *grid lanes***
> focus group attributes for key arrow navigation in menu's for example
> orientation depends on either using grid-template-(rows/columns)
> 
> works similarly to flex for using col/row & col/row-reverse
> 
> `repeat(autofill-fill, auto)` in case you don't know how large your items will be
> 
> `flow-tolerance` to 'normalize' the grid-lanes layout
> 
> [grid lanes MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Masonry_layout)

> [!important]
> ## Manuel Matuzovic
> **Breaking with habits**
> 
> wrap css reset in
> ```css
> @layer uaplus-reset-styles{
> 	*,
> 	*::before,
> 	*::after{
> 		box-sizing: border-box;
> 	}
> }
> ```
> 
> css pow()
> 
> 

> [!important]
> ## Niels Leenheer
> **DOOM in CSS**
> 
> - negative animation delay

> [!important]
> ## Eric Meyer
> 
> [`ray(<angle>)`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/ray#:~:text=The%20ray()%20CSS%20function,direction%20of%20the%20specified%20angle.)
> can be written in any order you like, only at needs to have a following position
> 

> [!important]
> ## [Una Kravets](https://codepen.io/collection/myqqRY)
> **Modern UI Patterns**
> 
> box shadow with multiple delcarations; using light-dark() to hide the light declarations when on dark and vice-versa
> 
> ```css
> @container anchored(fallback: flip-block) {
> 	position-area: bottom;
> 	border-top-color: transparent;
> 	border-bottom-color: var(--tooltip-bg);
> }
> ``` 
>  
>  overscrollcontainer
>  button with toggle-overscroll command and a commandfor the menu we want to overscroll

> [!important]
> ## [Adam Argyle](https://css-day-2026.netlify.app)
> **Contextualism**
> 
> elements should be able to adapt to their environment
> [Components can know](https://nerdy.dev/components-can-know)
> ### The user
> #### The device
> - width
> - orientation
> - pointer
> - hover
> - color-gamut
> 
> #### PReferences
> - reduced-data
> - color-scheme
> - reduced-motion
> - reduced-transparency
> - contrast
> - forced-color
> 
> #### Logical properties
> inline/block
> 
> ### Surroundings
> #### Design tokens
> for visual consistency
> 
> #### Where am I?
> components can escape the shadow dom when querying with named container queries!!!
> 
> #### Room to breathe
> Adapt based on width available
> 
> #### Quantity queries
> change parent based on amount of children
> 
> #### What's inside
> query what element it contains to change the styling
> query amount of invalid fields in a form
> 
> #### Style queries
> based on the value of a css var() we can adapt components
> 
> #### Stay close
> Scoping with @scope
> 
> #### Read the room
> using currentColor and light-dark more often
> 
> #### Size to content
> inline size with (min/max/fit)-content
> - **min** hug, wrap hard
> - **max** never wrap
> - **fit** grow till it fits
> 
> #### Animate to auto
> interpolate-size to grow to auto (even with `calc-size()`)
> 
> #### Repaint glyphs
> change the color of glyphs using `@font-palette-values` and `override-colors`
> 
> [**Open props v2**!!!!](https://opv2-beta.netlify.app/color/)
> 
> #### Irradiation illusion
> does not change layout shift; just visual
> `font-variation-settings: "GRAD" -50`
> 
> border radius match parent; no math with padding & border radius of the parent
> 
> `:playing` / `:paused` / `:picture-in-picture` / `fullscreen` 
> 
> `:placeholder-shown` rather than `:empty`
> 
> `:indeterminate`
> 
> `nth-child of [class]`
> 
> display-mode media query
> 
> contain-intrinsic-size: auto x-size;
> 
> hoist up the intersection of another element to drive the animation of a (neighbouring ) element
> 
> https://prop-for-that.netlify.app
> 
> scroll velocity - question
> 
> 
## Day 1

> [!tip]
> ## [Lea Verou](https://colorjs.io)
> **What the color!?**
> sRGB (space) 'normalizes' colors across screens
> Display P3
> Rec. 2020
> Prophoto color space?
> HEX, HSL, HWB and RGB dont produce the brightest color possible
> browsers clip colors rather than mapping them
> [gamut mapping](https://apps.colorjs.iogamut-mapping)
> [whatthecolor](https://whatthecolor.com)
> contrast-color()
> lab/lch vs oklab/oklch
> oklab/oklch are just the improved versions (with bug fixes)
>https://apps.colorjs.io/gamut
>[slides](talks.verou.me/whatthecolor)
> 

> [!tip]
> ## Josh Tumath
> **Font specification**
> 37% of users change their text scale on mobile devices
> 
> ### Proposals
> _opt-in_ specific elements
> ```css
> btn {
> 	font-size: calc(16px * env(preferred-text-scale))
> }
> ```
> `1pem`
> 
> _opt-in whole doc_
> ```html
> <meta name=text-scale content=scale>
> ```
> **Limited availability currently**
> dont use set (px) heights but rather min-heights if you need a specific height
> 
> [Defensive CSS](https://defensivecss.dev)

> [!tip]
> ## Jelle Raaijmakers
> **Ladybird | CSS, from Text to Pixels in Ladybird**

> [!important]
> ## [Lyra Rebane](https://lyra.horse)
> Putting the C in CSS (crimes)
> *x86 in CSS*
> multiple details
> logic gates
> ## x86 in CSS (chrome only)
> Jane Ori game of life
> container style queries to copy over css variables
> 

> [!tip]
> ## Sara Joy
> **Color scheming**
> `color-scheme()` can be set in html
> ```html
> <meta name="color-scheme" content="light dark">
> ```
> or in css
> ```css
> color-scheme: light dark;
> ```
> 
> some system colors are broken in chromium
> images in light-dark() to swap icons using `url()`!!!
> color scheme in `if()` and maybe even @container queries as perhaps as style query?
> 
> ### prefers-contrast: `more / less`
> seems like this isn't an option yet on OS's
> Jeremy Keith
> > "Javascript should only do what only javascript can do"
> 

> [!tip]
> ## [Bramus van Damme](https://www.bram.us/)
> **View transitions**
> view transition toolkit mentioned
>
>    *why group & image pair*
>    image pair is for blend mode isolation (cross fade for example)
>    group is responsible for the position and size
>    set old view transition elements to display none to prevent the cross fade
>    
>    `z-index: -1;` can help in some small cases
>    
>    `await transition.updateCallbackDone`
>    `await transition.ready`
>    [gesture](https://simple-set-demos.glitch.me/gesture)
>    relative additive animations (composite accumulate)
>    lunch break 13:20 view transition google table
>    
>    Internet explorer did it first; Interpage transitions

> [!tip]
> ## Jake Archibald
> 
> OpenUI since 2019
> dialog 2022
> Popovers 2024
> Invoker commands 2025 baseline
> 
> `min-width: anchor-size(width)` to span the full width of the anchor origin (new css function)
> 
> flip-block also flips the margin direction so if we set margin-bottom; after the flip it has a margin-top, this happens with certain values (not all)
> 
> for both the min-height and max-height we can use `calc-size(min-content, min(size, 16rem));`

