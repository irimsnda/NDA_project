/**
 * created by softclans
 * user robinson odhiambo
 */
//edited by Kip
Ext.define('Admin.store.parameters.productregistration.DosageFormStr', {
    extend: 'Ext.data.Store',
    alias: 'store.dosageformstr',
    storeId: 'dosageformstr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
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
                table_name:'par_dosage_forms'
            }));
        }
    }
});
