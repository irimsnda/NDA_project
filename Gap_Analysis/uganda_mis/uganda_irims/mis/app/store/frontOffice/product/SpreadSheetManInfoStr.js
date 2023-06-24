Ext.define('Admin.store.frontOffice.product.SpreadSheetManInfoStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetmaninfostr',
    storeId: 'spreadsheetmaninfostr',
    autoLoad: false,
    defaultRootId: 'root',
     
    proxy: {
        type: 'ajax',
        url: 'openoffice/getManInfo',
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
