/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.ApprovalRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'approvalrecommendationfrm',
    layout: 'form',
    frame: true,
    defaults: {
        allowBlank: false,
        labelStyle: 'font-weight:bold'
    },
    fieldDefaults: {
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'recommendation_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name'
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Decision',
            name: 'decision_id',
            store: 'approvaldecisionsstr',
            listeners: {
                change: function (cmb, newVal) {
                    var form = cmb.up('form'),
                        expiry_date = form.down('datefield[name=expiry_date]'),
                        signatory = form.down('combo[name=dg_signatory]'),
                        permit_signatory = form.down('combo[name=permit_signatory]');
                    if (newVal == 1 || newVal === 1) {
                      //  expiry_date.setDisabled(false);
                        signatory.setDisabled(false);
                    } else {
                       // expiry_date.setDisabled(true);
                        signatory.setDisabled(true);
                        permit_signatory.allowBlank = true;
                        permit_signatory.validate();
                        permit_signatory.reset();
                        permit_signatory.setVisible(false);
                    }
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Approval By',
            name: 'approved_by',
            store: 'usersstr',
            valueField: 'id',
            displayField: 'fullnames',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: true,
            anyMatch: true,
            hidden: true,
            value: user_id
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Approval Date',
            //value: new Date(),
            maxValue: new Date(),
            name: 'approval_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            listeners: {
                change: function (field, newVal, oldVal) {
                    var form = field.up('form'),
                        expiry_date = form.down('datefield[name=expiry_date]');
                    expiry_date.setMinValue(newVal);
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Permit Number',
            name: 'permit_no',
            allowBlank: true,
            readOnly: true,
            disabled: true
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Permit Expiry Date',
            //minValue: new Date(),
            disabled: true,
            name: 'expiry_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Comment',
            name: 'comment',
            allowBlank: true
        },
        {
            xtype: 'combo',
            store: 'confirmationstr',
            value: 1,
            fieldLabel: 'DG Signatory?',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            name: 'dg_signatory',
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        permit_signatory = form.down('combo[name=permit_signatory]');
                    if (newVal == 2 || newVal === 2) {
                        permit_signatory.setVisible(true);
                        permit_signatory.allowBlank = false;
                        permit_signatory.validate();
                    } else {
                        permit_signatory.setVisible(false);
                        permit_signatory.allowBlank = true;
                        permit_signatory.validate();
                    }
                }
            }
        },
        /*  {
              xtype: 'combo',
              fieldLabel: 'Permit Signatory',
              name: 'permit_signatory',
              store: 'usersstr',
              valueField: 'id',
              displayField: 'fullnames',
              queryMode: 'local',
              forceSelection: true,
              hidden: true,
              allowBlank: true
          },*/
        {
            xtype: 'combo',
            fieldLabel: 'Permit Signatory',
            margin: '0 20 20 0',
            name: 'permit_signatory',
            hidden: true,
            allowBlank: true,
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
                beforequery: function (record) {
                    record.query = new RegExp(record.query, 'ig');
                    record.forceAll = true;
                }
            }
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Recommendation',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            name: 'save_recommendation'
        },
        {
            xtype: 'button',
            text: 'Clear',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});