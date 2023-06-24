/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.ImportExportReviewRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'importexportreviewrecommfrm',
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
            listeners: {
                change: function (cmb, newVal) {
                    var form = cmb.up('form'),
                        signatory = form.down('combo[name=dg_signatory]'),
                        permit_signatory = form.down('combo[name=permit_signatory]');
                    
                },beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'par_permits_reviewrecommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'datefield',
            fieldLabel: 'Approval Date',
            value: new Date(),
            maxValue: new Date(),
            name: 'approval_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Permit Number',
            name: 'permit_no',
            allowBlank: true,
            readOnly: true,
            disabled: true
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Expiry Date',
            allowBlank: true,
            disabled: true,
            name: 'expiry_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Comment',
            name: 'comment',
            allowBlank: false
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