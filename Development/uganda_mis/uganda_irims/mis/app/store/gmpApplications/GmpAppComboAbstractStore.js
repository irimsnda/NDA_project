/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.store.gmpApplications.GmpAppComboAbstractStore', {
        extend: 'Ext.data.Store',
        storeId: 'gmpappcomboabstractstore',
        alias: 'store.gmpappcomboabstractstore',
        requires:[
            'Admin.model.gmpApplications.GmpApplicationsMdl'
        ],
        model: 'Admin.model.gmpApplications.GmpApplicationsMdl',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            url: 'gmpapplications/getGmpApplicationParamFromModel',
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
