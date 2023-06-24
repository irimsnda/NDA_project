/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.viewcontrollers.LaboratoryServicesVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.laboratoryservicesvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
    setPremiseRegGridsStore: function (obj, options) {
        this.fireEvent('setPremiseRegGridsStore', obj, options);
    },

    setPremiseRegCombosStore: function (obj, options) {
        this.fireEvent('setPremiseRegCombosStore', obj, options);
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },
    printInvoice: function (item) {
        this.fireEvent('printInvoice', item);
    },
    printReceipt: function (item) {
        var btn = item.up('button'),
            record = btn.getWidgetRecord(),
            payment_id = record.get('id');
        this.fireEvent('printReceipt', payment_id);
    }, printColumnReceipt: function (item) {
        var record = item.getWidgetRecord(),
            payment_id = record.get('id');
        this.fireEvent('printReceipt', payment_id);
    }
});