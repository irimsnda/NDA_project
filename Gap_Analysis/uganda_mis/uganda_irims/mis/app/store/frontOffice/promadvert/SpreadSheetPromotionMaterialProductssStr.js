Ext.define('Admin.store.frontOffice.promadvert.SpreadSheetPromotionMaterialProductssStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetpromotionmaterialproductsstr',
    storeId: 'spreadsheetpromotionmaterialproductsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    remoteFilter: true,

    proxy: {
        type: 'ajax',
        url: 'openoffice/getProductPaticulars',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message',
            totalProperty: 'totalResults'
        }
    }

});
