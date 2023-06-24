/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/27/2018.
 */
Ext.define('Admin.store.productRegistration.FoodProductRegistrationStr', {
    extend: 'Ext.data.Store',
    alias: 'store.foodproductregistrationstr',
    storeId: 'foodproductregistrationstr',
    requires: [
        'Admin.model.productRegistration.ProductRegMdl'
    ],
    model: 'Admin.model.productRegistration.ProductRegMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true, grouper: {
        groupFn: function (item) {
            return item.get('process_id') + item.get('workflow_stage_id');
        }
    },
    proxy: {
        type: 'ajax',
        url: 'productregistration/applications',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    }
});
