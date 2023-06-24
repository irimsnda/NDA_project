/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.forms.PaymentReversalApprovalFrm', {
    extend: 'Ext.form.Panel',
    title:'Payments Details',
    xtype: 'paymentreversalapprovalfrm',
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
        xtype:'textfield',
        fieldLabel:'Requested By', 
        fieldLabel:'Requested On', 
        name: 'requested_on'
    },{
        fieldLabel:'Requested By', 
        xtype:'textfield',
        fieldLabel:'Requested By', 
        name: 'requested_by'
    },{
        xtype:'textarea',
        fieldLabel:'Reason For Payment Reversal',
        fieldLabel:'Requested By', 
        name: 'reason_for_cancellation',
        readOnly: false,
        allowBlank: false,
        columnWidth:1
    },{
        xtype:'hiddenfield',
        name: 'receipt_id'
    },{
        xtype:'hiddenfield',
        name: 'active_application_code'
    },{
        xtype:'hiddenfield',
        name: 'invoice_id'
    }]
});