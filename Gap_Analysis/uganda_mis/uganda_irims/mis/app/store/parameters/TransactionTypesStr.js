Ext.define('Admin.store.parameters.TransactionTypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.transactiontypesstr',
    storeId: 'transactiontypesstr',
    requires: [
        'Admin.model.parameters.TransactionTypesMdl'
    ],
    model: 'Admin.model.parameters.TransactionTypesMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'parameters/transactiontype',
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
