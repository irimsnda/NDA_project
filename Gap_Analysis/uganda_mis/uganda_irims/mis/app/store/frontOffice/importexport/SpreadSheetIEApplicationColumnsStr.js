Ext.define('Admin.store.frontOffice.importexport.SpreadSheetIEApplicationColumnsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetieapplicationcolumnsstr',
    storeId: 'spreadsheetieapplicationcolumnsstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
     remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getIESpreadSheet',
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

