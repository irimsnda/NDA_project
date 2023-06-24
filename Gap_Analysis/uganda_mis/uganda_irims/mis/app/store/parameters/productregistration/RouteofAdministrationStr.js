/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.store.parameters.productregistration.RouteofAdministrationStr', {
    extend: 'Ext.data.Store',
    alias: 'store.routeofAdministrationStr',
    storeId: 'routeofAdministrationStr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
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
                    table_name:'routes_of_administration'
                }));
            }
        }
});
