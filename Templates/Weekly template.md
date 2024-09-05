<%* 
	let today = moment();
	let startOfWeek = today.startOf('week').add(1, 'days').format('YYYY-MM-DD');
	let endOfWeek = today.endOf('week').format('YYYY-MM-DD');
	
	%> Check out [yesterdays](<% tp.date.yesterday() %>) note!
# Week of <% startOfWeek %> to <% endOfWeek %>
## Daily notes for this week
___
- [<% today.startOf('week').add(1, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(1, 'days').format('YYYY-MM-DD') %>)
- [<% today.startOf('week').add(2, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(2, 'days').format('YYYY-MM-DD') %>)
- [<% today.startOf('week').add(3, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(3, 'days').format('YYYY-MM-DD') %>)
- [<% today.startOf('week').add(4, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(4, 'days').format('YYYY-MM-DD') %>)
- [<% today.startOf('week').add(5, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(5, 'days').format('YYYY-MM-DD') %>)