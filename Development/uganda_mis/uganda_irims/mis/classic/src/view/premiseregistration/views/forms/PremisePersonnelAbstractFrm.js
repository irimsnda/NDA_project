/**
 * Created by Kip on 4/25/2019.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PremisePersonnelAbstractFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisepersonnelabstractfrm',

    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 4,
        allowBlank: false,
        columnWidth: 0.33,
        labelAlign: 'top'
    },
    config:{
        moreDetails: 0
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'personnel_id'
        },

        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_personnel_information'
        },
        {
            xtype: 'hiddenfield',
            name: 'trader_id'
        }, {
            xtype: 'textfield',
            name: 'personnel_name',  
            fieldLabel: 'Name',
        },
        {
            xtype: 'textfield',
            name: 'telephone_no',
            fieldLabel: 'Telephone No'
        },
        {
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address'
        }
    ]
});