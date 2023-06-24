Ext.define('Admin.store.frontOffice.product.SpreadSheetProductInspectionStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetproductinspectionstr',
    storeId: 'spreadsheetproductinspectionstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
     
    proxy: {
        type: 'ajax',
        url: 'openoffice/getInspectionInfo',
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



