Ext.define('Admin.store.frontOffice.gmp.SpreadSheetGmpManLineStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgmpmanlinestr',
    storeId: 'spreadsheetgmpmanlinestr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getGmpManLine',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    },
 
});
