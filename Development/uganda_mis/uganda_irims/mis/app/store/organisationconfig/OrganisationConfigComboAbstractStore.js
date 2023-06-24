/**
 * Created by Kip on 8/29/2018.
 */
Ext.define('Admin.store.organisationconfig.OrganisationConfigComboAbstractStore', {
    extend: 'Ext.data.Store',
    storeId: 'organisationconfigcomboabstractstore',
    alias: 'store.OrganisationConfigComboAbstractStore',
    requires: [
        'Admin.model.organisationconfig.OrganisationConfigMdl'
    ],
    model: 'Admin.model.organisationconfig.OrganisationConfigMdl',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'organisationconfig/getOrgConfigParamFromModel',
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            rootProperty: 'results',
            messageProperty: 'msg'
        },
        extraParams: {
            _token:token
        }
    },
    // listeners: {
    //     load: function (store, records, success, operation) {
    //         var reader = store.getProxy().getReader(),
    //             response = operation.getResponse(),
    //             successID = reader.getResponseData(response).success,
    //             message = reader.getResponseData(response).message;
    //         if (!success || (successID == false || successID === false)) {
    //             toastr.warning(message, 'Warning Response');
    //         }
    //     }
    // }
});
