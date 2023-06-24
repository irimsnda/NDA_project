/**
 * Created by Kip on 8/17/2018.
 */
Ext.define('Admin.store.usermanagement.UsersStr', {
    extend: 'Ext.data.Store',
    storeId: 'usersstr',
    alias: 'store.usersstr',
    requires: [
        'Admin.model.usermanagement.UserManagementMdl'
    ],
    model: 'Admin.model.usermanagement.UserManagementMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'usermanagement/getActiveSystemUsers',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'msg'
        },
        extraParams: {

        }
    }
});
