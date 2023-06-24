Ext.define('Admin.store.summaryreport.IEReportGridStr',{
    extend: 'Ext.data.Store',
    alias: 'store.iereportgridstr',
    storeId: 'iereportgridstr',
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