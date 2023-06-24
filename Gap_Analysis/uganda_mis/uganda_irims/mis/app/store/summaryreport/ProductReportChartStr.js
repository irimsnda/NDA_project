Ext.define('Admin.store.summaryreport.ProductReportChartStr',{
    extend: 'Ext.data.Store',
    alias: 'store.productreportchartstr',
    storeId: 'productreportchartstr',
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