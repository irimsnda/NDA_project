/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.store.parameters.productregistration.ClassificationStr', {
    extend: 'Ext.data.Store',
    alias: 'store.classificationstr',
    storeId: 'classificationstr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromTable',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        }
    },
    model: 'Admin.model.parameters.ParametersMdl',
    listeners:{
        beforeload:function(store,op){
            op.setParams(Ext.apply(op.getParams()||{},{
                table_name:'par_classifications'
            }));
        }
    }
});
