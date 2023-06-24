Ext.define('Admin.view.frontoffice.enquiries.viewModel.EnquiriesReportVm', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.enquiriesreportvm',

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
        columns: [{
                   xtype: 'gridcolumn',
                  text: 'test23333',
                  dataIndex: 'Refence_No',
                  filter: {
                    xtype: 'textfield'
                  }
                }]
    },

    formulas: {
        isReadOnlyField: function (get) {
              return get('isReadOnly');
        }
    }
});