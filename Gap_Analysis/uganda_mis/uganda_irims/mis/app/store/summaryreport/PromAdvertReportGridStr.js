Ext.define('Admin.store.summaryreport.PromAdvertReportGridStr',{
    extend: 'Ext.data.Store',
    alias: 'store.promAdvertreportgridstr',
    storeId: 'promAdvertreportgridstr',
    groupField: 'Section',
    proxy: {
        type: 'ajax',
        url: 'summaryreport/getSummaryReports',
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
    autoLoad: false,
  
});