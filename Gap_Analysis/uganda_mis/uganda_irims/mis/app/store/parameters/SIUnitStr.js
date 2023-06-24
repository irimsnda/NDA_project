/**
 * created by softclans
 * user robinson odhiambo
 */
//edited by Kip
Ext.define('Admin.store.parameters.SIUnitStr', {
    extend: 'Ext.data.Store',
    alias: 'store.siunitstr',
    storeId: 'siunitstr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
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
    listeners:{
        beforeload:function(store,op){
            op.setParams(Ext.apply(op.getParams()||{},{
                table_name:'par_si_units'
            }));
        }
    }
});
