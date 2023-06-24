Ext.define('Admin.store.frontOffice.clinicaltrial.ClinicalTrialIMPProductsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.clinicaltrialimpproductsstr',
    storeId: 'clinicaltrialimpproductsstr',
    autoLoad: false,
    defaultRootId: 'root',
     enablePaging: true,
     remoteFilter: true,
    
    proxy: {
        type: 'ajax',
        url: 'openoffice/getClinicalTrialsIMPProducts',
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
