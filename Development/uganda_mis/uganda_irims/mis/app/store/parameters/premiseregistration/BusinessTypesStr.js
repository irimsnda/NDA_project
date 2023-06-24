Ext.define('Admin.store.parameters.premiseregistration.BusinessTypesStr', {
    extend: 'Ext.data.Store',
    alias: 'store.businesstypesstr',
    storeId: 'businesstypesstr',
    requires: [
        'Admin.model.parameters.BusinessTypeMdl'
    ],
    model: 'Admin.model.parameters.BusinessTypeMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromTable',
        //url: 'premiseregistration/parameters/businesstype',
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
                table_name:'par_business_types'
            }));
        }
    }
});
