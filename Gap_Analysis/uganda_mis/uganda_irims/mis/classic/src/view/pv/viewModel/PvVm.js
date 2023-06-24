Ext.define('Admin.view.pv.viewmodels.PvVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pvvm',
    itemId: 'pvvm',
    data: {
        atBeginning: true,
        atEnd: false,
        isReadOnly: false,
        prechecking_querytitle:'',
        model: {},
        hideDeleteButton: true
    },
    formulas: {
        isReadOnlyField: function (get) {
              return get('isReadOnly');
        }
    }
});