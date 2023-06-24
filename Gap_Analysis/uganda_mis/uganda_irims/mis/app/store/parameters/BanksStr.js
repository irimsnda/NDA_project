/**
 * Created by Kip on 10/15/2018.
 */
Ext.define('Admin.store.parameters.BanksStr', {
    extend: 'Ext.data.Store',
    alias: 'store.banksstr',
    storeId: 'banksstr',
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
            model_name:'Bank'
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
