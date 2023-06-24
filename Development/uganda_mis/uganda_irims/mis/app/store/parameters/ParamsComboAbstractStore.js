/**
 * Created by Kip on 10/24/2018.
 */
Ext.define('Admin.store.parameters.ParamsComboAbstractStore', {
    extend: 'Ext.data.Store',
    storeId: 'paramscomboabstractstore',
    alias: 'store.paramscomboabstractstore',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromModel',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            totalProperty: 'totals',
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
