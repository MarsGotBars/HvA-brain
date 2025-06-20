# Speakers / Topics

## @CSS DAY | THURSDAY

> [!bug]- ### Bard & Ian Frost
> #### Subatomic design tokens
>  

> [!info]- ## Rachel Andrew
> ### Multicol and fragmentation
> 	 @page useful for printing specific sizes

> [!hint]- ### [Brecht de Ruyter](https://utilitybend.com/)
> [Slideshow](https://slides.utilitybend.com/select-it)
> ### Select it!
> #### [Open UI](https://www.open-ui.org) 
> W3C group working on making UI stylable (enhancable)
> - popover API | full browser support ("auto" / "manual")
> - Invokers (open dialogs with just HTML) | quite limited availability
> 
> ##### Animating a popover
> Using @starting-style & transition-behavior: allow-discrete; for transitioning display
> both properties are relatively well supported
> 
> ##### Styling the select
> no anchor name necessary for anchor positioning the options on top of the select itself
> 
> interpolate-size: allow-keywords; for sizing 64px to auto
> 
> ###### Multiple selects
> _(very experimental)_
> multiple attribute 

> [!error]- ### [Cyd Stumpel](https://cydstumpel.nl/)
> 
> #### CSS came for (the boring parts of) my job
> [Broed](https://broedutrecht.nl/)
> 
> ##### SWAPJS
> **pros/cons**
> 
> More control but more complexity
> 
> 
> view-transition-class: for matching elements;
> 
> pagereveal event
> add type to viewtransition with js after pagereveal event
> 
> update function in startViewTransition to use types
> 
> ###### View transitions
> **pros/cons**
> 
> _pros_
> native, no math, less js (for simple transitions)
> 
> _cons_
> some restrictions, less control, dev tools are still a bit unstable, aspect ratio changes are hard


> [!bug]- ### Miriam Suzanne
> CSS mixins are not private within
> CSS functions _are_ private within
> 
> if() css

<!-- <details><summary>details</summary><div><p>content</p></div></details> -->

> [!INFO]- ## John Allsopp
> ### A Dao of CSS
> **[Tao te Ching](https://www.google.com/search?q=tao+te+ching&rlz=1C5CHFA_enNL1126NL1126&oq=tao+te+ching&gs_lcrp=EgZjaHJvbWUqBwgAEAAYjwIyBwgAEAAYjwIyBwgBEC4YgAQyBwgCEAAYgAQyBwgDEC4YgAQyBwgEEAAYgAQyBwgFEAAYgAQyBwgGEAAYgAQyBwgHEAAYgAQyBwgIEC4YgAQyBwgJEC4YgATSAQgxOTc2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8) (Chapter 37)**
> _The Tao never does anything, yet through it all things are done_
> ```css
 padding-inline-start: value;
 margin-inline-end: value;
 border-inline-start: value;
> ```
> Won't change
> `contain: layout style paint;`


> [!HINT]- ## [Adam Argyle](https://nerdy.dev/)
> 
> [The talk](https://nerdy.dev/cssday-2025)
> [The slides](https://css-day-2025.argyleink.deno.net/)
> [The codepens](https://codepen.io/collection/JYdmwr)
> 
> ### Level up your scroll UX | Inline scrollbar
> ---
> People grab thumbs
> Changing root scrollers (aside from styling) is a bad idea, but nested scrollers == fine
> highlighting nested scrollbar on focus within the container
>
> .scroll--root > .scroll--viewport > .scroll--content > CONTENT
>
> always use `overscroll-behavior-x`
> `inline-size: 100cqi;`
> `max-inline-size: 100%`
>
> on the scroll viewport
> outline-offset: -2px;
> outline: none;
>
>#0000 is hexcode with last 0 indicating transparency
> `background-clip: padding-box;`
> Scientific notation works in CSS: `1e3px`
> 
> make scroll-viewport and root containers
> and giving the root & viewport an anchor name
> 
> content prop can be accessible
> `content: "<-" / "Scroll left";`
> 
> scroll-state query (within container query)
> 
> (conditional queries) not is also a possibility in css container queries
> 
> [Container query MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
> - `cqi`: 1% of a query container's inline size
>   
>  @starting-style for 'loading'
>   
>  ### JS | Research
>  onscrollsnapchanging as an event
>  onscrollsnapchange as an event

## @BEFORE CSS DAY

### Carmen Ansio | Lottie

### Keep your UI in motion
#### Why motion matters
_Avoiding lazy motion is important_

```css
perspective: 2500;
```

```css
cubic-bezier(.33, 1, .68, 1);
```


### Vadim Makeev | MDN
#### You don't know MathML


### Pim van Die | IO Digital
#### How
- cos & sin
- Perlin noise
- Recursion
Nature of code mentioned again

sin() & cos()
@property
sibling counts & index

atan()
atan2()

##### ideas
create a circle with words

### [Manuel Sánchez](https://www.manuelsanchezdev.com/)

#### Beyond borders (and Outlines):
_Crafting inclusive experiences with modern CSS_

#### Debug A11Y issues with CSS

Usual path -> tools -> css solution

CSS first path -> CSS as a tool

using `:has(+(> :not(li)))::before` for debugging wrong child elements of `<ul>` elements

`*:has(> img:not([alt]))::before`

#### Always get enough contrast with CSS
[Lea verou](https://lea.verou.me/)

contrast-color();

##### Step 1
###### Choose your color
`--color: oklch(65% 0.15 270);`

###### Compare the bg lightness to a threshold
`--l-threshold: 62.3%;`

```css
.contrast-text {
color: white;
text-shadow: 0 0 0.05em black, 0 0 0.05em black;

@supports (color: oklch(from red l c h)){
--l: clamp(0, (l / var(--l-threshold) - 1))
}
}
```

https://lea.verou.me/blog/2024/contrast-color/

## PRE CSS DAY

> [!BUG] ### Nils Binder | Unwrapping web design | 9elements | Germany
> #### Wrappers
> - creates max-width
> - creates padding
> - centers content
> ```css
width: min(100% - 3rem, 75rem);
margin-inline: auto;
margin-inline: max(1.5rem, ((100% - var(--wrapper-max, 75rem)) / 2);
> ```
> 
> 
> ```css
> grid-template-columns:
> 	minxmax(1.5rem, 1fr);
> 		minmax(0, 8rem);
> 			minmax(30rem, 100% - 1.5rem * 2);
> 		minmax(0, 8rem);
> 	minmax(1.5rem, 1fr);
> ```
> [dashruhrgebiet.de](dasruhrgebiet.de)
> 
> Slightly off-center content in a box
> ```css
> .box{
> 	display: flex;
> 	flex-direction: column;
>	 &:before, &:after { content: ""}
>	 &:before { flex-grow: 4; }
>	 &:after { flex-grow: 5; }
> ```

> [!ERROR] ### Miriam Suzanne
> No device specific markup
> !importance propsal
> 



