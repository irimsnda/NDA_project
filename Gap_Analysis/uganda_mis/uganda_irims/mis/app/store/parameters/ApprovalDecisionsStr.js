/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.store.parameters.ApprovalDecisionsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.approvaldecisionsstr',
    storeId: 'approvaldecisionsstr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromModel',
        extraParams:{
            model_name:'ApprovalDecision'
        },
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
