/**
 * Created by Kip on 8/29/2018.
 */
Ext.define('Admin.view.organisationconfig.viewcontrollers.OrganisationConfigVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.organisationconfigvctr',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    }
    
});