Ext.define('Admin.store.parameters.FeeTypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.feetypesstr',
    storeId: 'feetypesstr',
    requires: [
        'Admin.model.parameters.FeeTypesMdl'
    ],
    model: 'Admin.model.parameters.FeeTypesMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'parameters/feetype',
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
