/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.forms.BatchInvoiceRequestPnlFrm', {
    extend: 'Ext.form.Panel',
    title:'Payments Details',
    xtype: 'batchinvoicerequestpnlfrm',
    layout:{
        type: 'column',
        columns: 3 
    },
    defaults:{
        labelAlign: 'top',
        columnWidth: 0.33,
        margin: 5
    },
    items: [{
        xtype:'numberfield',
        fieldLabel:'Batch Invoice No', 
        readOnly: true,
        name: 'batch_invoice_no'
    },{
        xtype:'numberfield',
        fieldLabel:'Payment Control No', 
        readOnly: true,
        name: 'batch_control_no'
    },{
        xtype: 'numberfield',
        name: 'total_amount',
        readOnly: true,
        fieldLabel: 'Total Amount(Converted)'
    },{
        xtype: 'combo',
        fieldLabel: 'Paying Currency',
        store: 'currenciesstr',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,  
        name: 'currency_id',
        allowBlank: false,
        listeners: {
            beforerender: function () {
                var store = this.getStore(),
                    filterObj = {is_paying_currency: 1},
                    filterStr = JSON.stringify(filterObj);
                store.removeAll();
                store.load({params: {filters: filterStr}});
            },
        }
    },{
        fieldLabel:'Requested By', 
        xtype:'combo',
        fieldLabel:'Requested By', 
        name: 'requested_by',
        valueField: 'id',
        displayField: 'fullnames',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setUserCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'usermanagement/getActiveSystemUsers'
                    }
                },
                isLoad: true
            },
            
        }
    },{
        xtype:'hiddenfield',
        name: 'batch_receipt_id'
    },{
        xtype:'hiddenfield',
        name: 'active_application_code'
    },{
        xtype:'hiddenfield',
        name: 'batch_invoice_id'
    }]
});