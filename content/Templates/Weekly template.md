<%\*
let today = moment();
let startOfWeek = today.startOf('week').add(1, 'days').format('YYYY-MM-DD');
let endOfWeek = today.endOf('week').subtract(1, 'days').format('YYYY-MM-DD');
%>

# Week of <% startOfWeek %> to <% endOfWeek %>

## Daily notes for this week

---

- [<% today.startOf('week').add(1, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(1, 'days').format('YYYY-MM-DD') %>)
- [<% today.startOf('week').add(2, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(2, 'days').format('YYYY-MM-DD') %>)
- [<% today.startOf('week').add(3, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(3, 'days').format('YYYY-MM-DD') %>)
- [<% today.startOf('week').add(4, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(4, 'days').format('YYYY-MM-DD') %>)
- [<% today.startOf('week').add(5, 'days').format('YYYY-MM-DD') %>](<% today.startOf('week').add(5, 'days').format('YYYY-MM-DD') %>)
