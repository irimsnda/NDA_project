/**
 * Created by Kip on 8/24/2018.
 */
Ext.define('Admin.store.administration.MenuProcessesRolesStr', {
    extend: 'Ext.data.Store',
    storeId: 'menuprocessesrolesstr',
    alias: 'store.menuprocessesrolesstr',
    requires: [
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'administration/getMenuProcessesRoles',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
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
