Ext.define('Admin.store.summaryreport.ProdNoteReportChartStr',{
    extend: 'Ext.data.Store',
    alias: 'store.prodnotereportchartstr',
    storeId: 'prodnotereportchartstr',
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