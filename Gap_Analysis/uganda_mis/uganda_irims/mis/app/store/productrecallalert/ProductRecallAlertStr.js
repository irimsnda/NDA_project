/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 27/05/2021
 */
Ext.define('Admin.store.productrecallalert.ProductRecallAlertStr', {
    extend: 'Ext.data.Store',
    alias: 'store.productrecallalertstr',
    storeId: 'productrecallalertstr',
    requires: [],
    
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true, grouper: {
        groupFn: function (item) {
            return item.get('product_id');
        }
    },
    proxy: {
        type: 'ajax',
        url: 'api/thscp/getProductRecallAlertApplications',
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