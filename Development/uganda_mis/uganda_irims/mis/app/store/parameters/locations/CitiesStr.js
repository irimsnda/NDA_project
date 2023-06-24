/**
 * Created by Kip on 9/25/2018.
 */
Ext.define('Admin.store.parameters.locations.CitiesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.citiesstr',
    storeId: 'citiesstr',
    requires: [
        'Admin.model.parameters.LocationMdl'
    ],
    model: 'Admin.model.parameters.LocationMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    pageSize: 10000,
    proxy: {
        type: 'ajax',
        url: 'parameters/city',
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
