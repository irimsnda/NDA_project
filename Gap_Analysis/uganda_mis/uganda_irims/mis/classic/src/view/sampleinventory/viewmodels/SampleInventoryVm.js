Ext.define('Admin.view.sampleinventory.viewmodels.SampleInventoryVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.sampleinventoryvm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'ProductRegistrationVm',
            autoLoad: true
        }
        */
    },
    data: {
        atBeginning: true,
        atEnd: false,
        isReadOnly: false,
        pnl_title: 'Active Requests',
        prechecking_querytitle:''
    },
    formulas: {
        isReadOnlyField: function (get) {
              return get('isReadOnly');
        }
    }
});