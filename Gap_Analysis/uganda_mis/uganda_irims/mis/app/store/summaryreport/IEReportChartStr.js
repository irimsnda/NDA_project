Ext.define('Admin.store.summaryreport.IEReportChartStr',{
    extend: 'Ext.data.Store',
    alias: 'store.iereportchartstr',
    storeId: 'iereportchartstr',
    proxy: {
        type: 'ajax',
        url: 'summaryreport/GetChartProductApplications',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    },
    autoLoad: false
   
        
    
});