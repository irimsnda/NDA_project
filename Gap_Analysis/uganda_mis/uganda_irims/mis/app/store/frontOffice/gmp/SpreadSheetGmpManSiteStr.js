Ext.define('Admin.store.frontOffice.gmp.SpreadSheetGmpManSiteStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgmpmansitestr',
    storeId: 'spreadsheetgmpmansitestr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getGmpManSite',
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
