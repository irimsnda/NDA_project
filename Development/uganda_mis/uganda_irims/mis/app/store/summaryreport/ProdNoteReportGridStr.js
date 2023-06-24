Ext.define('Admin.store.summaryreport.ProdNoteReportGridStr',{
    extend: 'Ext.data.Store',
    alias: 'store.prodnotereportgridstr',
    storeId: 'prodnotereportgridstr',
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