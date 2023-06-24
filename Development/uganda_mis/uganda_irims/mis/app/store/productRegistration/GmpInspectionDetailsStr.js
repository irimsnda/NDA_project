
/**
 * Created by softclans
 * user robinson odhiambo
 * on 9/27/2018.
 */
Ext.define('Admin.store.productRegistration.GmpInspectionDetailsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.gmpInspectionDetailsStr',
    storeId: 'gmpInspectionDetailsStr',
    requires: [
        'Admin.model.productRegistration.ProductRegMdl'
    ],
    model: 'Admin.model.productRegistration.ProductRegMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    groupField: 'workflow_stage',
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
