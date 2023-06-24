/**
 * Created by Kip on 10/16/2018.
 */
Ext.define('Admin.store.dashboard.InTrayStr', {
    extend: 'Ext.data.Store',
    storeId: 'intraystr',
    alias: 'store.intraystr',
    requires:[
        'Admin.model.dashboard.DashboardMdl'
    ],
    pageSize: 1000000,
    model: 'Admin.model.dashboard.DashboardMdl',
    autoLoad: false,
    remoteFilter: true,
    grouper: {
        groupFn: function (item) {
            if(item.get('is_receipting_stage') == 1){
                return item.get('module_id') + item.get('workflow_stage_id')+ item.get('application_status_id');
            }else{
                return item.get('sub_module_id') + item.get('workflow_stage_id');
            }
        }
    },
    proxy: {
        type: 'ajax',
        url: 'dashboard/getInTrayItems',
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
