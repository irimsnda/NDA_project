Ext.define('Admin.store.parameters.locations.CountriesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.countriesstr',
    storeId: 'countriesstr',
    requires: [
        'Admin.model.parameters.LocationMdl'
    ],
    model: 'Admin.model.parameters.LocationMdl',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    pageSize: 10000,
    proxy: {
        type: 'ajax',
        url: 'parameters/country',
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
