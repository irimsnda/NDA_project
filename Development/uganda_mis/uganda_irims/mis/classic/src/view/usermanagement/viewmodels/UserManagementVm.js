/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.viewmodels.UserManagementVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.usermanagementvm',

    stores: {
        /*
        A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
        store configuration. For example:

        users: {
            model: 'UserManagementVm',
            autoLoad: true
        }
        */
    },

    data: {
        atBeginning: true,
        atEnd: false,
        firstName: '',
        lastName: '',
        email: ''
    },

    formulas: {
        name: function (get) {
            var fn = get('firstName'),
                ln = get('lastName');
            return (fn && ln) ? (fn + ' ' + ln) : (fn || ln || '');
        }
    }

});