/**
 * Created by Kip on 11/9/2018.
 */
Ext.define('Admin.store.parameters.premiseregistration.PersonnelPositionsStr', {
    extend: 'Ext.data.Store',
    alias: 'store.personnelpositionsstr',
    storeId: 'personnelpositionsstr',
    requires: [
        'Admin.model.parameters.PersonnelQualificationMdl'
    ],
    model: 'Admin.model.parameters.PersonnelQualificationMdl',
    autoLoad: false,
    defaultRootId: 'root',
    enablePaging: true,
    proxy: {
        type: 'ajax',
        url: 'commonparam/getCommonParamFromModel',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'message'
        },
        extraParams: {
            model_name: 'PersonnelPosition'
        }
    }
});
