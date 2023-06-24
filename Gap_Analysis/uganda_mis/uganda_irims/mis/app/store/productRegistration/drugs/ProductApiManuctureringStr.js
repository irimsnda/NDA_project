/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/27/2018.
 */
Ext.define('Admin.store.productRegistration.drugs.ProductApiManuctureringStr', {
    extend: 'Ext.data.Store',
    alias: 'store.productApiManuctureringStr',
    storeId: 'productApiManuctureringStr',
    requires: [
        'Admin.model.productRegistration.ProductRegMdl'
    ],
    model: 'Admin.model.productRegistration.ProductRegMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'productregistration/onLoadproductApiManufacturer',
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
