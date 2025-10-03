> [!WARNING] 
> # Erwin Hofman & Karlijn Löwik
> ## Web performance in 2025: Putting real UX first
> Core web vitals only run on chrome (not other browsers)
> 
> ## Browser APIs
> - Speculation rules

> [!NOTE]
> # <ins>[Brecht de Ruyte](https://utilitybend.com/)</ins>
> ## Pop it, Invoke it, Select it
> popover="manual" so you can set your own actions
> css pseudoclass
> 
> ## Top layer
> ### Transitioning the top layer
> using starting style
> 
> 
> ```css
> [popover] {
>	 --starting-pos: 30px;
> 	opacity: 0;
> 	translate: 0 calc(var(--starting-pos) * -1);
> 	transition-property: opacity, translate,overlay, display;
> 	transition-duration: .8s;
> 	transition-behavior: allow-discrete;
> 	
> 	&:popover-open{
> 		  opacity: 1;
> 		  translate: 0;
> 		  @starting-style {
> 		    opacity: 0;
> 		    translate: 0 var(--starting-pos);
> 		  }
> 	}
> }
> ```
> ### Anchoring
> margin: 0;
> inset: auto;
> position-area: top;
> 
> https://anchor-tool.com
> 
> #### Position-try-fallbacks
> flip-block || flip-inline || flip-start
> 
> ## Interestfor (experimental)
> interestfor as an attribute (popover on hover)
> ### interest-delay
> play with delays
> 
> ## interest-source
> 
> ## popover (hint)
> give it a role
> 
> 
> ## Invoker commands
> trigger (open) a dialog element with `commandfor`, provide an id of the dialog you want to open and a `command` attribute
> 
> ### Custom command
> requires 2 dashes (--custom-comand) and can be used in JS

> [!TIP]
> # <ins>[Thorsten Jonas](https://thorstenjonas.com)</ins>
> https://sustainableuxnetwork.com
> 
> ## Beyond user-centricity: designing sustainable digital products
> - Understanding the surrounding ecosystem
> - Actor mapping
> 	- Identify human and non-human actors that are impacted by or related to the product
> - Needs to consequences mapping
> 	- Identify negative consequences of a product and understand how they are related to user- and business-needs
> - Breaking negative impacts down from high-level perspective to actionable items
> - Design for _less carbon emissions_
> - [WSG](https://w3c.github.io/sustyweb/)

> [!IMPORTANT]
> # <ins>[Dylan Beattie](https://dylanbeattie.net)</ins>
> ## HOW TO BE A ROCKSTAR DEVELOPER
