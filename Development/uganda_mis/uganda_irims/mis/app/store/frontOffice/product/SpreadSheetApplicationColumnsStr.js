Ext.define('Admin.store.frontOffice.product.SpreadSheetApplicationColumnsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetapplicationcolumnsstr',
    storeId: 'spreadsheetapplicationcolumnsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'openoffice/getApplicationColumns',
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
