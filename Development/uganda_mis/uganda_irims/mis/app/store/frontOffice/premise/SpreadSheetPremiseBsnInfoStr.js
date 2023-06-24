Ext.define('Admin.store.frontOffice.premise.SpreadSheetPremiseBsnInfoStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetpremisebsninfostr',
    storeId: 'spreadsheetpremisebsninfostr',
    autoLoad: false,
    defaultRootId: 'root',
   
    proxy: {
        type: 'ajax',
        url: 'openoffice/getPremisebsnInfo',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    }
});
