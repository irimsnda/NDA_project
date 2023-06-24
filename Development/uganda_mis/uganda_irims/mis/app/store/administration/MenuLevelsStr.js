/**
 * Created by Kip on 7/9/2018.
 */
Ext.define('Admin.store.administration.MenuLevelsStr', {
    extend: 'Ext.data.Store',
    storeId: 'menulevelsstr',
    alias: 'store.menulevelsstr',
    requires: [
        'Admin.model.administration.AdministrationMdl'
    ],
    model: 'Admin.model.administration.AdministrationMdl',
    data: {
        levels: [
            {id: '0', name: 'Level 0 (Parent)'},
            {id: '1', name: 'Level 1 (Child)'},
            {id: '2', name: 'Level 2 (Grandchild)'}
        ]
    },
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'levels'
        }
    }
});
