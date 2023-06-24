/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.viewmodels.SurveillanceVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.surveillancevm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'SurveillanceVm',
            autoLoad: true
        }
        */
    },

    data: {
        atBeginning: true,
        atEnd: false
    }
});