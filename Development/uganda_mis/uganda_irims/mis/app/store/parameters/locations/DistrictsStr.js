Ext.define('Admin.store.parameters.locations.DistrictsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.districtsstr',
    storeId: 'districtsstr',
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
        url: 'parameters/district',
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
