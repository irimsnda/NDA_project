Ext.define('Admin.store.frontOffice.promadvert.SpreadSheetPromAdvertColumnsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetpromadvertcolumnsstr',
    storeId: 'spreadsheetpromadvertcolumnsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    remoteFilter: true,

    proxy: {
        type: 'ajax',
        url: 'openoffice/getPromAdvertSpreadsheet',
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
