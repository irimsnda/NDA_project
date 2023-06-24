Ext.define('Admin.store.frontOffice.gmp.SpreadSheetGmpBsnTypeDetailsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetgmpbsntypedetailsstr',
    storeId: 'spreadsheetgmpbsntypedetailsstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getGmpBsnDetails',
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
