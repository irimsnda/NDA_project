/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.forms.InvoiceReversalRequestPnlFrm', {
    extend: 'Ext.form.Panel',
    title:'Invoice Details',
    xtype: 'invoicereversalrequestpnlfrm',
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
        fieldLabel:'Invoice Date',allowBlank: false,
        disabled: true,
        name: 'date_of_invoicing'
    },{
        xtype:'textfield',
        fieldLabel:'Invoice No',
        allowBlank: false,
         disabled: true,
        name: 'invoice_no'
    },{
        xtype:'textfield',
        fieldLabel:'Payment Control No', disabled: true,
        name: 'PayCtrNum'
    },{
        xtype:'textfield',
        fieldLabel:'Reference No', disabled: true,
        name: 'reference_no'
    },{
        xtype:'textfield',
        fieldLabel:'Tracking No', disabled: true,
        name: 'tracking_no'
    },{
        xtype:'textfield',
        fieldLabel:'Applicant Name', disabled: true,
        name: 'applicant_name'
    },{
        xtype:'textarea',
        fieldLabel:'Reason For Cancellation',
        name: 'reason_for_cancellation',
        readOnly: false,
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