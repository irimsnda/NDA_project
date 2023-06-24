Ext.define('Admin.store.frontOffice.clinicaltrial.SpreadSheetClinicalTrialApplicationColumnsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.spreadsheetclinicaltrialtapplicationcolumnsstr',
    storeId: 'spreadsheetclinicaltrialtapplicationcolumnsstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
     remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getClinicalTrialsSpreadsheet',
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
