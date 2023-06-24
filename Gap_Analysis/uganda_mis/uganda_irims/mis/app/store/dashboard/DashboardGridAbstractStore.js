    Ext.define('Admin.store.dashboard.DashboardGridAbstractStore', {
    extend: 'Ext.data.Store',
    storeId: 'dashboardgridabstractstore',
    alias: 'store.dashboardgridabstractstore',
    requires:[
        'Admin.model.dashboard.DashboardMdl'
    ],
    model: 'Admin.model.dashboard.DashboardMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'dashboard/getDashParamFromModel',
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
