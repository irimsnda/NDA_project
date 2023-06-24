/**
 * Created by Softclans on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.viewmodels.ImportExportPermitsVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.importexportpermitsvm',

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
        application_title: 'Permit Application',
        isVisaApplication: true,
        showProdDosageForm: false,
        showProdSubCategory:false
    },
    formulas: {
        isReadOnlyField: function (get) {
              return get('isReadOnly');
        }
    }
});