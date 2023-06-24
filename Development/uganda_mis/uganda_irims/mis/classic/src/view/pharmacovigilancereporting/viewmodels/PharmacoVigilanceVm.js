/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.clinicaltrial.viewmodels.PharmacoVigilanceVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pharmacovigilancevm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'ClinicalTrialVm',
            autoLoad: true
        }
        */
    },

    data: {
        atBeginning: true,
        atEnd: false,
        atDetails: false,
        atOtherDetails: false
    }
});