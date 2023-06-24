Ext.define('Admin.store.parameters.ExchangeRatesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.exchangeratesstr',
    storeId: 'exchangeratesstr',
    requires: [
        'Admin.model.parameters.ExchangeRatesMdl'
    ],
    model: 'Admin.model.parameters.ExchangeRatesMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'parameters/exchangerate',
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
