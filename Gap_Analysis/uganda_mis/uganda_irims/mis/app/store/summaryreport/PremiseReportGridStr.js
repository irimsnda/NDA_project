Ext.define('Admin.store.summaryreport.PremiseReportGridStr',{
    extend: 'Ext.data.Store',
    alias: 'store.premisereportgridstr',
    storeId: 'premisereportgridstr',
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