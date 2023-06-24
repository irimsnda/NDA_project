/**
 * Created by Kip on 12/14/2018.
 */
Ext.define('Admin.view.gmpapplicationsinspections.viewmodels.GmpApplicationsVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gmpapplicationsvm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'GmpInspectionsVm',
            autoLoad: true
        }
        */
    },

    data: {
        atBeginning: true,
        atEnd: false
    }

});