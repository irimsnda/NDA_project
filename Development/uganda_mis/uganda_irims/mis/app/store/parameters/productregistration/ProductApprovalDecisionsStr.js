/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.store.parameters.productregistration.ProductApprovalDecisionsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.productApprovalDecisionsStr',
    storeId: 'productApprovalDecisionsStr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'configurations/getNonrefParameter',
        extraParams: {
            table_name: 'par_approval_decisions'
        },
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
