/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.forms.InvoiceReversalApprovalPnlFrm', {
    extend: 'Ext.form.Panel',
    title:'Invoice Details',
    xtype: 'invoicereversalapprovalpnlfrm',
    layout:{
        type: 'column',
        columns: 3  
    },
    defaults:{
         readOnly: true,
        labelAlign: 'top',
        columnWidth: 0.33,
        margin: 5

    },
    items: [{
        xtype:'displayfield',
        fieldLabel:'Requested On', 
        name: 'requested_on'
    },{
        xtype:'displayfield',
        fieldLabel:'Requested By', 
        name: 'requested_by'
    },{
        xtype:'textarea',
        fieldLabel:'Reason For Cancellation',
        name: 'reason_for_cancellation',
        allowBlank: false,
        columnWidth:1
    },{
        xtype:'hiddenfield',
        fieldLabel:'Invoice No',
        name: 'invoice_id'
    },{
        xtype:'hiddenfield',
        name: 'active_application_code'
    }]
});