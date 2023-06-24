Ext.define('Admin.store.frontOffice.promadvert.SpreadSheetPromotionMaterialDetailsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetpromotionmaterialdetailsstr',
    storeId: 'spreadsheetpromotionmaterialdetailsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    remoteFilter: true,

    proxy: {
        type: 'ajax',
        url: 'openoffice/getPromotionMaterialDetails',
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
