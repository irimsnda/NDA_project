Ext.define('Admin.store.parameters.premiseregistration.BusinessScalesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.businessscalesstr',
    storeId: 'businessscalesstr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'premiseregistration/parameters/businessscale',
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
