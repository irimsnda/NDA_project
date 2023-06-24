/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.store.configurations.ConfigGridAbstractStore', {
    extend: 'Ext.data.Store',
    storeId: 'configgridabstractstore',
    alias: 'store.configgridabstractstore',
    requires: [
        'Admin.model.configurations.ConfigurationsMdl'
    ],
    model: 'Admin.model.configurations.ConfigurationsMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'configurations/getConfigParamFromModel',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'msg',
            totalProperty: 'total'
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
