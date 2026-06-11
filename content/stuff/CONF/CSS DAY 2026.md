# Speakers

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

