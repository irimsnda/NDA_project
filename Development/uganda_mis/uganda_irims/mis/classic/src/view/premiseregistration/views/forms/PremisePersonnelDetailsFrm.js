/**
 * Created by Kip on 11/7/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PremisePersonnelDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisepersonneldetailsfrm',
    controller: 'premiseregistrationvctr',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 4,
        allowBlank: false,
        columnWidth: 0.5,
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.query('.button').forEach(function (c) {
                    c.setHidden(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'is_temporal'
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
            name: 'premise_id'
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Position',
            name: 'position_id',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            forceSelection: true,
            store: 'personnelpositionsstr'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Qualification',
            name: 'personnel_qualification_id',
            store: 'trapersonnelqualificationsstr',
            valueField: 'id',
            displayField: 'qualification_combined',
            queryMode: 'local',
            forceSelection: true,
            listeners   : {
                beforequery: function(record){
                    record.query = new RegExp(record.query, 'ig');
                    record.forceAll = true;
                }
            }
        }
       
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_personnel_information',
            storeID: 'premisepersonneldetailsstr',
            action_url: 'premiseregistration/savePremisePersonnelLinkageDetails',
            handler: 'savePremisePersonnelLinkageDetails'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});