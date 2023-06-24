/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.store.parameters.GmpApprovalDecisionsStr', {
        extend: 'Ext.data.Store',
        alias: 'store.gmpapprovaldecisionsstr',
        storeId: 'gmpapprovaldecisionsstr',
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
                model_name:'GmpApprovalDecision'
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
