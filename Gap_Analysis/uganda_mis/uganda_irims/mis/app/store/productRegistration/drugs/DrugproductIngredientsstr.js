/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/27/2018.
 */
Ext.define('Admin.store.productRegistration.drugs.DrugproductIngredientsstr', {
    extend: 'Ext.data.Store',
    alias: 'store.drugproductIngredientsstr',
    storeId: 'drugproductIngredientsstr',
    requires: [
        'Admin.model.productRegistration.ProductRegMdl'
    ],
    model: 'Admin.model.productRegistration.ProductRegMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'productregistration/onLoaddrugproductIngredients',
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    }
});
