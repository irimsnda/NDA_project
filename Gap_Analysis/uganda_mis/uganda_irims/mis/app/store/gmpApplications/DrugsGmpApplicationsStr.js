/**
 * Created by Kip on 1/7/2019.
 */
Ext.define('Admin.store.gmpApplications.DrugsGmpApplicationsStr', {
        extend: 'Ext.data.Store',
        storeId: 'drugsgmpapplicationsstr',
        alias: 'store.drugsgmpapplicationsstr',
        requires: [
            'Admin.model.gmpApplications.GmpApplicationsMdl'
        ],
        model: 'Admin.model.gmpApplications.GmpApplicationsMdl',
        autoLoad: false,
        grouper: {
            groupFn: function (item) {
                return item.get('process_id') + item.get('workflow_stage_id');
            }
        },
        proxy: {
            type: 'ajax',
            url: 'gmpapplications/getGmpApplications',
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
