Ext.define('Admin.store.summaryreport.ProductRegistrationSummaryStr',{
    extend: 'Ext.data.Store',
    alias: 'store.productregistrationsummarystr',
    storeId: 'productregistrationsummarystr',
    proxy: {
        type: 'ajax',
        url: 'summaryreports/foodproductssummary',
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