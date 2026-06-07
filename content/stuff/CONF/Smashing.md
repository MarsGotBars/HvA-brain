# Speakers

> [!tip]
>
> ## The invisible Divide
>
> ### _Christine Vallaure_
>
> [layout slides & resources](moonlearning.io/layout)
>
> More layout options in figma
>
> [Jen Simmons](https://labs.jensimmons.com/)
> https://moonblocks.io

> [!tip]
>
> ## AI Without the Chaos: Context-Based Design Systems in Practice
>
> ### _TJ Pitre_
>
> _Southleft founder & CEO_
>
> In the realm of design, AI needs better context rather than prompts
>
> FigmaLint to (for example) find hardcoded values & missing tokens

> [!bug]
>
> ## Soft skills & Hard problems
>
> ### _Calvin Robertson & Chris Kolb_
>
> summary; it is not about the flow/process but the people within it

> [!important]
>
> ## Manuel Matuzović on 19½ Things You Didn’t Know about Accessibility in HTML and CSS
>
> ### _Manuel Matuzovic_
>
> 1. Fixed items (like header & cookie banner) cover the screen around 200-250% zoom
> 2. aria hasPopup on buttons is an invalid usecase, instead use aria expanded or popover
>    1. dialog + popover instantly puts you inside of the dialog elem, this works no matter where this dialog is located. (but try to place it as close to it as possible)
>    2. aria expanded is already set on the dialog with popover by default
> 3. SVG by default has role image, SVG should have aria-hidden true set by default if purely decorative, if it is not decorative; set the role to `img` and aria-label (otherwise use `title` element within the svg, ideally use aria-labelledby and set it to the title id)
>    1. Do not use role presentation and an aria label on it; this label will cancel out the presentation role
> 4. role presentation removes the semantic meaning from elements
>    1. img with role presentation will remove it from the a11y tree
> 5. buttons swallow up any semantic meaning within it: button > h2 will only announce the button
> 6. geolocation element, asks user for location
>    1. Styling is quite limited to prohibit tricking people
>    2. the button is deactivated when contrast is too low
> 7. Chrome console _eye icon_ `document.activeElement`
> 8. Chrome devtools settings Advanced Perceptual algorithm (APCA)
>    [htmhell](https://htmhell.dev)

> [!tip]
>
> ## UX writing for AI interfaces
>
> ### _Nick DiLallo_

> [!warning]
>
> ## Complex design for stupid people
>
> ## _Chris Kolb_
>
> **2312 Kim Stanley Robinson**
>
> https://bessermit.design

> [!info]
>
> ## Making by breaking
>
> ### _dina Amin_
>
> limitations are essential, tools are just there to help you out
>
> #### Instagram
>
> dina a amin

> [!tip]
>
> ## Components as data for humans and machines
>
> ### _Nathan Curtis_

> [!important]
>
> ## Effective & beautiful data visualization
>
> ### _Nadieh Bremer_
>
> [Data visualization](https://www.visualcinnamon.com/)

> [!info] ## Smart layout patterns with modern CSS
>
> ### Kevin Powell
>
> #### Container queries
>
> Usage of is only about 19% (on chrome)
> You can use calcs in @media and @container (css variables are not possible in these, most likely)
> Container queries are aware of the parent REM, using REM in media just takes the browser standard, not whatever you have set in the `html {}`
> using `ch` also works!
>
> @container queries we can compare the element size to the viewport size (vw)
>
> viewport inline?
>
> comparing the inline-size of the container query to its own `cqi` also works!
>
> `@container style()` is shipping soon in firefox
>
> [slides!](https://kevinpowell.co/talks/smart-layout-patterns)
>
> #### Tips
>
> ```css
> @media (width > 768px) {
> }
> ```
