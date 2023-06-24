/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.forms.CreditNoteRequestPnlFrm', {
    extend: 'Ext.form.Panel',
    title:'Rquest Details',
    xtype: 'creditnoterequestpnlfrm',
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
        hidden: true,
        name: 'date_of_invoicing'
    },{
        xtype:'textfield',
        fieldLabel:'Invoice No',
        allowBlank: false,
         disabled: true,hidden: true,
        name: 'invoice_no'
    },{
        xtype:'textfield',
        fieldLabel:'Payment Control No', 
        disabled: true,hidden: true,
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
        xtype: 'numberfield',
        name: 'credit_note_amount',
        readOnly: true,

        fieldLabel: 'Credit Note Amount(Converted)'
    },{
            xtype: 'combo',
            fieldLabel: 'Currency',
            store: 'currenciesstr',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            name: 'currency_id',
            allowBlank: false,
            readOnly: false,
            listeners: {
                beforerender: function () {
                    var store = this.getStore(),
                        filterObj = {is_paying_currency: 1},
                        filterStr = JSON.stringify(filterObj);
                    store.removeAll();
                    store.load({params: {filters: filterStr}});
                },
                change:'funcOnChangeCreditNoteCurrency'
            }
    },{
        xtype: 'numberfield',
        name: 'total_amount',
        readOnly: true,
        fieldLabel: 'Total Credit Note Amount'
    },{
        xtype:'textarea',
        fieldLabel:'Reason For Request',
        name: 'reason_for_request',
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
    },{
        xtype:'hiddenfield',
        name: 'exchange_rate'
    },{
        xtype:'hiddenfield',
        name: 'receipt_id'
    }]
});