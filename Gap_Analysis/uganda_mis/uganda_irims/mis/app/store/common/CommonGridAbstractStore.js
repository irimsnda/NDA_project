/**
 * Created by Kip on 2/11/2019.
 */
Ext.define('Admin.store.common.CommonGridAbstractStore', {
    extend: 'Ext.data.Store',
    storeId: 'commongridabstractstore',
    alias: 'store.commongridabstractstore',
    requires: [
        'Admin.model.common.CommonMdl'
    ],
    model: 'Admin.model.common.CommonMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: '',
        headers: {
            'Authorization': 'Bearer ' + access_token
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
