/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.forms.CreditNoteApprovalPnlFrm', {
    extend: 'Ext.form.Panel',
    title:'Payments Details',
    xtype: 'creditnoteapprovalpnlfrm',
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
            forceSelection: true,  readOnly: true,
            name: 'currency_id',
            allowBlank: false,
            readOnly: true,
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
        xtype: 'numberfield',
        name: 'total_amount',
        readOnly: true,
        fieldLabel: 'Total Credit Note Amount'
    },{
        xtype:'textarea',
        fieldLabel:'Reason For Request',
        name: 'reason_for_request',
        readOnly: true,
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