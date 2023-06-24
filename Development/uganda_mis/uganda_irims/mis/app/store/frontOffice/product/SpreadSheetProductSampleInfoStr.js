Ext.define('Admin.store.frontOffice.product.SpreadSheetProductSampleInfoStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetproductsampleinfostr',
    storeId: 'spreadsheetproductsampleinfostr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getSampleInfo',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    }
});
