Ext.define('Admin.store.frontOffice.gmp.SpreadSheetGmpManBlockStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgmpmanblockstr',
    storeId: 'spreadsheetgmpmanblockstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getgmpmanblock',
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
