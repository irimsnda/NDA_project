
/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/27/2018.
 */
Ext.define('Admin.store.productRegistration.GmpInspectionApplicationsDetailsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.gmpInspectionApplicationsDetailsStr',
    storeId: 'gmpInspectionApplicationsDetailsStr',
    requires: [
        'Admin.model.productRegistration.ProductRegMdl'
    ],
    model: 'Admin.model.productRegistration.ProductRegMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'productregistration/onLoadgmpInspectionApplicationsDetails',
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
