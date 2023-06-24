Ext.define('Admin.store.parameters.premiseregistration.BusinessTypeDetailsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.businesstypedetailsstr',
    storeId: 'businesstypedetailsstr',
    requires: [
        'Admin.model.parameters.BusinessTypeDetailMdl'
    ],
    model: 'Admin.model.parameters.BusinessTypeDetailMdl',
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
                table_name:'par_business_type_details'
            }));
        }
    }
    
});
