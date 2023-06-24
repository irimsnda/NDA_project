Ext.define('Admin.store.parameters.System_controllersStr', {
    extend: 'Ext.data.Store',
    storeId: 'system_controllersStr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    defaultRootId: 'root',
    proxy: {
        type: 'ajax',
        url: 'parameters/getCommonparameters',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'msg'
        }
    },
    listeners: {
        beforeload: function (store, op) {
            // Set request parameters (without overriding other parameters)

            op.setParams(Ext.apply(op.getParams() || {}, {
                table_name: 'par_system_controllers'
            }));
        }
    }
});
