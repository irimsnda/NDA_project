/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.productnotifications.viewmodels.ProductNotificationsVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.productnotificationsvm',

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
        isReadOnly: false
    },
    formulas: {
        isReadOnlyField: function (get) {
              return get('isReadOnly');
        }
    }
});