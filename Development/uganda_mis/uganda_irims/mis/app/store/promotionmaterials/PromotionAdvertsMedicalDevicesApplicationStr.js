Ext.define('Admin.store.promotionmaterials.PromotionAdvertsMedicalDevicesApplicationStr', {
    extend: 'Ext.data.Store',
    storeId: 'promotionadvertsmedicaldevicesapplicationsstr',
    alias: 'store.promotionadvertsmedicaldevicesapplicationsstr',
    autoLoad: false,
    grouper: {
        groupFn: function (item) {
            return item.get('process_id') + item.get('workflow_stage_id');
        }
    },
    proxy: {
        type: 'ajax',
        url: 'promotionmaterials/getPromotionMaterialsApplications',
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