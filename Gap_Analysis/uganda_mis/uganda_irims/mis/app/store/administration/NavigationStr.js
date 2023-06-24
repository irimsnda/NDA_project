/**
 * Created by Kip on 6/28/2018.
 */
Ext.define('Admin.store.administration.NavigationStr', {
    extend: 'Ext.data.TreeStore',
    storeId: 'navigationstr',
    alias: 'store.navigationstr',
    remoteSort: false,
    requires: [
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',
    autoLoad: false,
    defaultRootId: 'root',
    proxy: {
        type: 'ajax',
        api: {
            read: 'administration/getSystemNavigationMenuItems'
        },
        headers: {
            'Authorization':'Bearer '+access_token
        },
        reader: {
            type: 'json',
            idProperty: 'id',
            messageProperty: 'msg'
        },
        extraParams: {
            strict_check: true
        }
    }
});




