Ext.define('Admin.store.frontOffice.clinicaltrial.ClinicalTrialInvestigatorsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.clinicaltrialinvestigatorsstr',
    storeId: 'clinicaltrialinvestigatorsstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
     remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getClinicalTrialsInvestigators',
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
