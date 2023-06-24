Ext.define('Admin.store.frontOffice.product.SpreadSheetProductPackagingStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetproductpackagingstr',
    storeId: 'spreadsheetproductpackagingstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
     
    proxy: {
        type: 'ajax',
        url: 'openoffice/getProductPackaging',
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
