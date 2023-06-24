/**
 * Created by Kip on 8/29/2018.
 */
Ext.define('Admin.controller.OrganisationConfigCtr', {
    extend: 'Ext.app.Controller',
    stores:[
        'Admin.store.organisationconfig.OrganisationConfigComboAbstractStore'
    ],
    config: {
        /*
        Uncomment to add references to view components
        refs: [{
            ref: 'list',
            selector: 'grid'
        }],
        */

        /*
        Uncomment to listen for events from view components
        control: {
            'useredit button[action=save]': {
                click: 'updateUser'
            }
        }
        */
    },

    /**
     * Called when the view is created
     */
    init: function() {

    },

    listen: {
        controller: {
            '*': {
                setOrgConfigGridsStore: 'setOrgConfigGridsStore',
                setOrgConfigCombosStore: 'setOrgConfigCombosStore'
            }
        }
    },

    setOrgConfigGridsStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            toolbar = me.down('pagingtoolbar'),
            store = Ext.create('Admin.store.organisationconfig.OrganisationConfigComboAbstractStore', config);
        me.setStore(store);
        toolbar.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    },

    setOrgConfigCombosStore: function (me, options) {
        var config = options.config,
            isLoad = options.isLoad,
            store = Ext.create('Admin.store.organisationconfig.OrganisationConfigComboAbstractStore', config);
        me.setStore(store);
        if (isLoad === true || isLoad == true) {
            store.removeAll();
            store.load();
        }
    }

});