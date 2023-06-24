/**
 * Created by Kip on 8/31/2018.
 */
Ext.define('Admin.store.usermanagement.PassResetOptionsStr', {
    extend: 'Ext.data.Store',
    storeId: 'passresetoptionsstr',
    requires:[
        'Admin.model.usermanagement.UserManagementMdl'
    ],
    model:  'Admin.model.usermanagement.UserManagementMdl',
    autoLoad: true,

    data: { options: [
            { id: '1', name: "Reset to default"},
            { id: '2', name: "Allow user to enter"}
        ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'options'
        }
    }
});
