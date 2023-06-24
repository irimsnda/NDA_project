Ext.define('Admin.store.summaryreport.ProductReportGridStr',{
    extend: 'Ext.data.Store',
    alias: 'store.productreportgridstr',
    storeId: 'productreportgridstr',
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