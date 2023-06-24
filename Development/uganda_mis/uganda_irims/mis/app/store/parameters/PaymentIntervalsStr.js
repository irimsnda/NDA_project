Ext.define('Admin.store.parameters.PaymentIntervalsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.paymentintervalsstr',
    storeId: 'paymentintervalsstr',
    requires: [
       // 'Admin.model.parameters.PaymentIntervalsMdl'
    ],
    //model: 'Admin.model.parameters.PaymentIntervalsMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'parameters/paymentinterval',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'data',
            messageProperty: 'message'
        }
    }
});
