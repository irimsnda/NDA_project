
 var months = [];
        m = 01
    while (m<=12){
         months.push([m]);
          m++;
    }
Ext.define('Admin.store.Month_store', {
     extend: 'Ext.data.SimpleStore',
	 
    storeId: 'month_store',
     fields : ['months'],
     data : months
});