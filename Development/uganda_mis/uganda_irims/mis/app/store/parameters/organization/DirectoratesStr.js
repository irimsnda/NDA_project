Ext.define('Admin.store.parameters.organization.DirectoratesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.directoratesstr',
    storeId: 'directoratesstr',
    requires: [
        'Admin.model.parameters.DirectorateMdl'
    ],
    model: 'Admin.model.parameters.DirectorateMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'organization/parameters/directorate',
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
