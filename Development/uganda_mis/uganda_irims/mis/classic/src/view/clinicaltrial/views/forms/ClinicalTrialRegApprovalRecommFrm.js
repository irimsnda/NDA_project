/**
 * Created by Kip on 1/26/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialRegApprovalRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialregapprovalrecommfrm',
    layout: 'form',
    frame: true,
    defaults: {
        allowBlank: false,
        labelStyle: 'font-weight:bold'
    },
    fieldDefaults:{
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
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinicalregapproval_decisions'
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
            hidden: true,
            store: 'usersstr',
            valueField: 'id',
            displayField: 'fullnames',
            queryMode: 'local',
            forceSelection: true,
            allowBlank: true,
            listeners   : {
                beforequery: function(record){
                    record.query = new RegExp(record.query, 'ig');
                    record.forceAll = true;
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
            name: 'permit_no',
            allowBlank: true,
            readOnly: true,
            disabled: true
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Expiry Date',
            allowBlank: true,
            readOnly: true,
            disabled: true,
            hidden: true,
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