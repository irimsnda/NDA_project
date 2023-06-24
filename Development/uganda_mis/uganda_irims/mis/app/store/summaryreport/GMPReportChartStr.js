Ext.define('Admin.store.summaryreport.GMPReportChartStr',{
    extend: 'Ext.data.Store',
    alias: 'store.gmpreportchartstr',
    storeId: 'gmpreportchartstr',
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