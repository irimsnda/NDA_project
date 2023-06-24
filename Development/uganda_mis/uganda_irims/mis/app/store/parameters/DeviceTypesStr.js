Ext.define('Admin.store.parameters.DeviceTypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.devicetypesstr',
    storeId: 'devicetypesstr',
    autoLoad: true,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getDeviceTypes',
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
