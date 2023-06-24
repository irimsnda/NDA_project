Ext.define('Admin.store.summaryreport.PremiseReportChartStr',{
    extend: 'Ext.data.Store',
    alias: 'store.premisereportchartstr',
    storeId: 'premisereportchartstr',
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