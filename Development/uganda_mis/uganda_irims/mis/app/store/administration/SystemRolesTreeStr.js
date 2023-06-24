/**
 * Created by Kip on 7/10/2018.
 */
Ext.define('Admin.store.administration.SystemRolesTreeStr', {
    extend: 'Ext.data.TreeStore',

    storeId: 'systemrolestreestr',
    alias: 'store.systemrolestreestr',
    remoteSort: false,
    requires:[
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',
    autoLoad: false,
    defaultRootId: 'root',
    proxy: {
        type: 'ajax',
        api: {
            read: 'administration/getSystemRoles'
        },
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            messageProperty: 'msg'
        }
    },
    listeners: {
        load: function (store, records, success, operation) {
            var reader = store.getProxy().getReader(),
                response = operation.getResponse(),
                successID = reader.getResponseData(response).success,
                message = reader.getResponseData(response).message;
            if (!success || (successID == false || successID === false)) {
                toastr.warning(message, 'Warning Response');
            }
        }
    }
});
