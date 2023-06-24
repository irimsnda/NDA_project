Ext.define('Admin.store.summaryreport.CTReportChartStr',{
    extend: 'Ext.data.Store',
    alias: 'store.ctreportchartstr',
    storeId: 'ctreportchartstr',
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