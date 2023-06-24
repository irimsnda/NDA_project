Ext.define('Admin.store.frontOffice.importexport.SpreadSheetIEApplicationSectionsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetieapplicationsectionsstr',
    storeId: 'spreadsheetieapplicationsectionsstr',
    autoLoad: true,
    defaultRootId: 'root',
     enablePaging: true,
    
    proxy: {
        type: 'ajax',
       url: 'openoffice/getIESections',
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

