/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.premiseregistration.viewmodels.PremiseRegistrationVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.premiseregistrationvm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'PremiseRegistrationVm',
            autoLoad: true
        }
        */
    },

    data: {
        atBeginning: true,
        atEnd: false,
        atBeginningApproval: true,
        atEndApproval: false
    }
});