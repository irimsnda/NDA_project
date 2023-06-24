Ext.define('Admin.store.frontOffice.disposal.SpreadSheetDisposalApplicationColumnsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetdisposaltapplicationcolumnsstr',
    storeId: 'spreadsheetdisposaltapplicationcolumnsstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
     remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getDisposalSpreadsheetColumns',
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
