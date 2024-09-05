<%* 
	let today = moment();
	let startOfWeek = today.startOf('week').add(1, 'days').format('YYYY-MM-DD');
	let endOfWeek = today.endOf('week').format('YYYY-MM-DD');
	
	%>
# Week of <% startOfWeek %> to <% endOfWeek %>