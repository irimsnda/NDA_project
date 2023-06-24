/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.store.usermanagement.UserManagementGridAbstractStore', {
    extend: 'Ext.data.Store',
    storeId: 'usermanagementgridabstractstore',
    alias: 'store.usermanagementgridabstractstore',
    requires: [
        'Admin.model.usermanagement.UserManagementMdl'
    ],
    model: 'Admin.model.usermanagement.UserManagementMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'usermanagement/getUserParamFromModel',
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
