Ext.define('Admin.store.parameters.System_modulesStr', {
    extend: 'Ext.data.Store',
    storeId: 'system_modulesStr',
    requires:[
        'Admin.model.parameters.ParametersMdl'
    ],
    model: 'Admin.model.parameters.ParametersMdl',
    autoLoad: false,
    defaultRootId: 'root',
   proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromModel',
        extraParams:{
            model_name:'Modules'
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
