/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.forms.LTRFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ltrfrm',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.down('button[action=link_ltr]').setDisabled(true);
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
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
            xtype: 'combo',
            fieldLabel: 'Applicant as Local Technical Representative',
            store: 'confirmationstr',
            valueField: 'id',
            columnWidth: 0.4,
            displayField: 'name',
            name: 'applicant_as_ltr',
            queryMode: 'local',
            forceSelection: true,
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        fieldSet = form.down('fieldset[name=ltr_details]');
                    if (newVal == 1 || newVal === 1) {
                        fieldSet.down('button[action=link_ltr]').setDisabled(true);
                        Ext.each(fieldSet.query('field'), function(field) {
                            field.reset();
                        });
                    } else {
                        fieldSet.down('button[action=link_ltr]').setDisabled(false);
                    }
                }
            }
        },
        {
            xtype: 'fieldset',
            title: 'Local Technical Representative Details',
            style: 'background:white',
            name: 'ltr_details',
            columnWidth: 1,
            collapsible: false,
            layout: {
                type: 'column'
            },
            bodyPadding: 5,
            defaults: {
                columnWidth: 0.25,
                margin: 5,
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'ltr_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: '_token',
                    value: token
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Name',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'ltr_name',
                            readOnly: true,
                            columnWidth: 0.9
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            tooltip: 'Search LTR',
                            action: 'link_ltr',
                            childXtype: 'ltrselectiongrid',
                            winTitle: 'LTR Selection List',
                            winWidth: '90%'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'TIN',
                    readOnly: true,
                    name: 'tin_no'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Physical Address',
                    readOnly: true,
                    name: 'ltr_physical_address'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldLabel: 'Postal Address',
                    name: 'ltr_postal_address'
                },
                {
                    xtype: 'textfield',
                    readOnly: true,
                    fieldLabel: 'Telephone',
                    name: 'ltr_telephone'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Fax',
                    readOnly: true,
                    name: 'ltr_fax'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Email',
                    readOnly: true,
                    name: 'ltr_email'
                }
            ]
        }
    ]
});