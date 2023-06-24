Ext.define('Admin.store.summaryreport.CTReportGridStr',{
    extend: 'Ext.data.Store',
    alias: 'store.ctreportgridstr',
    storeId: 'ctreportgridstr',
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