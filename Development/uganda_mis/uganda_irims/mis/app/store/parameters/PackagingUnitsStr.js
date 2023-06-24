/**
 * Created by Kip on 3/5/2019.
 */
Ext.define('Admin.store.parameters.PackagingUnitsStr', {
        extend: 'Ext.data.Store',
        alias: 'store.packagingunitsstr',
        storeId: 'packagingunitsstr',
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
                    table_name:'par_packaging_units'
                }));
            }
        }
    });
