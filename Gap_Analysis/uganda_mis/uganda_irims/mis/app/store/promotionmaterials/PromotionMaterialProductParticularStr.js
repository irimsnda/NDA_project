Ext.define('Admin.store.promotionmaterials.PromotionMaterialProductParticularStr', {
    extend: 'Ext.data.Store',
    storeId: 'promotionmaterialproductparticularstr',
    alias: 'store.promotionmaterialproductparticularstr',
 /*    requires: [
        'Admin.model.premiseRegistration.PremiseRegMdl'
    ],
    model: 'Admin.model.premiseRegistration.PremiseRegMdl', */
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'promotionmaterials/getPromotionMaterialsProductParticular',
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
