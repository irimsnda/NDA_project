/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.GmpConditionalApprovalRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gmpconditionalapprovalrecommendationfrm',
    controller: 'gmpapplicationsvctr',
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
           // store: 'gmpapprovaldecisionsstr',
            listeners: {
                change: function (cmb, newVal) {
                    var form = cmb.up('form'),
                        expiry_date = form.down('datefield[name=expiry_date]'),
                        signatory = form.down('combo[name=dg_signatory]'),
                        permit_signatory = form.down('combo[name=permit_signatory]');
                    if (newVal == 1 || newVal === 1 || newVal === 3) {
                        //expiry_date.setDisabled(false);
                        signatory.setDisabled(false);
                    } else {
                        //expiry_date.setDisabled(true);
                        signatory.setDisabled(true);
                        permit_signatory.allowBlank = true;
                        permit_signatory.validate();
                        permit_signatory.reset();
                        permit_signatory.setVisible(false);
                    }
                },
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gmpapproval_decisions',
                                filters: JSON.stringify({id: 4})
                            }

                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Approval By',
            name: 'approved_by',
            store: 'usersstr',
            valueField: 'id',
            hidden: true,
            displayField: 'fullnames',
            queryMode: 'local',
            forceSelection: true,
            anyMatch: true,
            allowBlank: true
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Approval Date',
            value: new Date(),
          //  maxValue: new Date(),
          //  minValue: Ext.Date.subtract(new Date(), Ext.Date.DAY, approval_lag_days),
            name: 'approval_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Certificate Number',
            name: 'permit_no',
            allowBlank: true,
            readOnly: true
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Expiry Date',
            readOnly: true,
            name: 'expiry_date',
            submitFormat: 'Y-m-d',
            allowBlank: true,
            format: 'd/m/Y',
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
            fieldLabel: 'Approval Signatory?',
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
            fieldLabel: 'Certificate Signatory',
            margin: '0 20 20 0',
            name: 'permit_signatory',
            hidden: true,
            allowBlank: true,
            valueField: 'id',
            anyMatch: true,
            displayField: 'fullnames',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setUserCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'usermanagement/getActiveSystemUsers',
                          
                        },
                       
                    },
                    isLoad: true
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