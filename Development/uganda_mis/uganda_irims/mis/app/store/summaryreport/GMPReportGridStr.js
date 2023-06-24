Ext.define('Admin.store.summaryreport.GMPReportGridStr',{
    extend: 'Ext.data.Store',
    alias: 'store.gmpreportgridstr',
    storeId: 'gmpreportgridstr',
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