Ext.define('Admin.store.parameters.locations.RegionsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.regionsstr',
    storeId: 'regionsstr',
    requires: [
        'Admin.model.parameters.LocationMdl'
    ],
    model: 'Admin.model.parameters.LocationMdl',
    autoLoad: false,
    defaultRootId: 'root',
    pageSize: 10000,
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'parameters/region',
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
