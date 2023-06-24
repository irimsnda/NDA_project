Ext.define('Admin.store.frontOffice.clinicaltrial.ClinicalTrialStudySiteStr', {
    extend: 'Ext.data.Store',
    alias: 'store.clinicaltrialstudysitestr',
    storeId: 'clinicaltrialstudysitestr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
     remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getClinicalTrialsStudySite',
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
