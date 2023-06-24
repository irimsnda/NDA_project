Ext.define('Admin.store.reports.RevenueChartAbstractStr', {
    extend: 'Ext.data.Store',
    storeId: 'revenueChartAbstractStr',
    alias: 'store.revenueChartAbstractStr',
    autoLoad: false,
    proxy: {
        type: 'ajax',
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
