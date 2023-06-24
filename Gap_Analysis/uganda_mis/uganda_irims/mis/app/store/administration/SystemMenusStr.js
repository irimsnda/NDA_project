/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.store.administration.SystemMenusStr', {
    extend: 'Ext.data.TreeStore',
    storeId: 'systemmenusstr',
    alias: 'store.systemmenusstr',
    remoteSort: false,
    requires:[
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',

    autoLoad: false,
    pageSize: 100000,
    defaultRootId: 'root',
    proxy: {
        type: 'ajax',
        api: {
            read: 'administration/getSystemNavigationMenuItems'
        },
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            messageProperty: 'msg'
        },
        extraParams: {
            strict_check: false
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
