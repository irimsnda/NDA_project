Ext.define('Admin.store.parameters.costs.CostSubCategoriesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.costsubcategoriesstr',
    storeId: 'costsubcategoriesstr',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getcostSubCategories',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'data',
            messageProperty: 'message'
        }
    }
});
