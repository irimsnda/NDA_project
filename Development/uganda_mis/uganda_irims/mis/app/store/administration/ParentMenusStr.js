/**
 * Created by Kip on 7/9/2018.
 */

Ext.define('Admin.store.administration.ParentMenusStr', {
    extend: 'Ext.data.Store',
    storeId: 'parentmenusstr',
    alias: 'store.parentmenusstr',
    requires: [
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'administration/getParentMenus',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
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
