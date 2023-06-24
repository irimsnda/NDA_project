Ext.define('Admin.store.parameters.costs.CostCenterStr', {
    extend: 'Ext.data.Store',
    alias: 'store.costcenterstr',
    storeId: 'costcenterstr',
    requires: [
        'Admin.model.parameters.CostMdl'
    ],
    model: 'Admin.model.parameters.CostMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'parameters/costcenter',
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
