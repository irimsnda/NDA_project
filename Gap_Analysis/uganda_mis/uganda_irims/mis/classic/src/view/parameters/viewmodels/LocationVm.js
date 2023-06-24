
Ext.define('Admin.view.productregistration.viewmodels.LocationVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.locationvm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'LocationVm',
            autoLoad: true
        }
        */
    },
    data: {
        atBeginning: true,
        atEnd: false,
        isReadOnly: false,
        prechecking_querytitle:''
    },
    formulas: {
        isReadOnlyField: function (get) {
              return get('isReadOnly');
        }
    }
});