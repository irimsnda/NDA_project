/**
 * Created by Kip on 7/13/2018.
 */
Ext.define('Admin.store.administration.AdministrationGridAbstractStore', {
    extend: 'Ext.data.Store',
    storeId: 'administrationgridabstractstore',
    alias: 'store.administrationgridabstractstore',
    requires:[
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'administration/getAdminParamFromModel',
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
            model_name: 'AdminModel'
        }
    },
    // listeners: {
    //     load: function (store, records, success, operation) {
    //         var reader = store.getProxy().getReader(),
    //             response = operation.getResponse(),
    //             successID = reader.getResponseData(response).success,
    //             message = reader.getResponseData(response).message;
    //         if (!success || (successID == false || successID === false)) {
    //             toastr.warning(message, 'Warning Response');
    //         }
    //     }
    // }
});
