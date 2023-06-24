Ext.define('Admin.store.frontOffice.premise.SpreadSheetPremisePersonnelInfoStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetpremisepersonnelinfostr',
    storeId: 'spreadsheetpremisepersonnelinfostr',
    autoLoad: false,
    defaultRootId: 'root',
     
    proxy: {
        type: 'ajax',
        url: 'openoffice/getPremisePersonnelInfo',
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
