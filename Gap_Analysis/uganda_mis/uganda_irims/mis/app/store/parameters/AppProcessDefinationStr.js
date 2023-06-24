Ext.define('Admin.store.parameters.AppProcessDefinationStr', {
    extend: 'Ext.data.Store',
    alias: 'store.appProcessDefinationStr',
    storeId: 'appProcessDefinationStr',
    requires: [
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
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
                table_name:'par_appprocess_definations'
            }));
        }
    }
});
