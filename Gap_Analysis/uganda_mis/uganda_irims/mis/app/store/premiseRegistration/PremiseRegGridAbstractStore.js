/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.store.premiseRegistration.PremiseRegGridAbstractStore', {
    extend: 'Ext.data.Store',
    storeId: 'premisereggridabstractstore',
    alias: 'store.premisereggridabstractstore',
    requires:[
        'Admin.model.premiseRegistration.PremiseRegMdl'
    ],
    model: 'Admin.model.premiseRegistration.PremiseRegMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'premiseregistration/getGmpApplicationParamFromModel',
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
