Ext.define('Admin.store.frontOffice.premise.SpreadSheetPremiseApplicationColumnsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetpremiseapplicationcolumnsstr',
    storeId: 'spreadsheetpremiseapplicationcolumnsstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
     remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getPremiseApplicationColumns',
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
