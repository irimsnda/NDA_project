/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.store.administration.ChildMenusStr', {
    extend: 'Ext.data.Store',
    storeId: 'childmenusstr',
    alias: 'store.childmenusstr',
    requires:[
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',

    autoLoad: false,
    //pageSize: 100,

    defaultRootId: 'root',

    proxy: {
        type: 'ajax',
        url: 'administration/getChildMenus',
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
