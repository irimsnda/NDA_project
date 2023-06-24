Ext.define('Admin.store.frontOffice.gmp.SpreadSheetGmpApplicationColumnsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgmpapplicationcolumnsstr',
    storeId: 'spreadsheetgmpapplicationcolumnsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: 'openoffice/getGmpSpreadSheet',
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
