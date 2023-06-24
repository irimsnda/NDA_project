
Ext.define('Admin.view.configurations.viewmodels.ConfigurationsVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.configurationsvm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'ConfigurationsVm',
            autoLoad: true
        }
        */
    },

    data: {

        pnl_title: 'Parameter'
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});