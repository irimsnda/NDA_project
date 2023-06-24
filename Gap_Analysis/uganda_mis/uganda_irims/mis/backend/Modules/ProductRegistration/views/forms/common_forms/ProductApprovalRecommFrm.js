/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ProductApprovalRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productApprovalRecommFrm',
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
    items: [{
            xtype: 'hiddenfield',
            name: 'reg_product_id'
        },
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
            store: 'productApprovalDecisionsStr',
            listeners: {
                change: function (cmb, newVal) {

                    var form = cmb.up('form'),
                        signatory = form.down('combo[name=dg_signatory]'),
                        permit_signatory = form.down('combo[name=permit_signatory]'),
                        expiry_date = form.down('datefield[name=expiry_date]');
                        reason_for_conditionalapproval = form.down('htmleditor[name=reason_for_conditionalapproval]');
                        reason_for_rejection = form.down('htmleditor[name=reason_for_rejection]');

                    if (newVal == 1 || newVal === 1) {
                        signatory.setDisabled(false);
                        expiry_date.setDisabled(false);
                        reason_for_conditionalapproval.setVisible(false);
                        reason_for_rejection.setVisible(false);
                        expiry_date.setReadOnly(true);
                        expiry_date.setReadOnly(true);
                        expiry_date.allowBlank = true;
                        reason_for_conditionalapproval.allowBlank = true;
                        reason_for_rejection.allowBlank = true;
                    }else if (newVal == 2 || newVal === 2) {
                        signatory.setDisabled(false);
                        expiry_date.setReadOnly(false);
                        expiry_date.setReadOnly(false);
                        reason_for_conditionalapproval.setVisible(true);
                        reason_for_rejection.setVisible(false);

                        expiry_date.allowBlank = false;
                        reason_for_conditionalapproval.allowBlank = false;
                        reason_for_rejection.allowBlank = true;
                    } else {
                        signatory.setDisabled(true);
                        permit_signatory.allowBlank = true;
                        permit_signatory.validate();
                        permit_signatory.reset();
                        expiry_date.setDisabled(true);
                        permit_signatory.setVisible(false);
                        reason_for_conditionalapproval.setVisible(false);
                        reason_for_rejection.setVisible(true);
                        expiry_date.allowBlank = true;
                        reason_for_conditionalapproval.allowBlank = true;
                        reason_for_rejection.allowBlank = false;
                    }
                },
                afterrender: function () {
                    var store = this.getStore();

                        filterObj = {is_appeal_decision: 0},
                        filterStr = JSON.stringify(filterObj);
                    store.removeAll();
                    store.load({params: {filters: filterStr}});
                }
            }
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Approval Date',
            value: new Date(),
            maxValue: new Date(),
            name: 'approval_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Authorization Number',
            name: 'certificate_no',
            allowBlank: true,
            readOnly: true,
            disabled: true
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Expiry Date',
            allowBlank: true,readOnly: true,
            name: 'expiry_date',
            submitFormat: 'Y-m-d',
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
        },{
                xtype: 'htmleditor',
                name:'reason_for_conditionalapproval',
                hidden: true,
                fieldLabel:'Reasons for Conditional Approval'
        },{
                xtype: 'htmleditor',
                name:'reason_for_rejection',
                hidden: true,
                fieldLabel:'Reasons for Rejection Approval'
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