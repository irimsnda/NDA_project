Ext.define('Admin.store.summaryreport.SurveillancePmsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.surveillancepmsstr',
    storeId: 'surveillancepmsstr',//surveillancepmsstr
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    remoteFilter: true,

    proxy: {
        type: 'ajax',
        url: 'openoffice/getPMSSpreadSheet',//getPMSSpreadSheet
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
