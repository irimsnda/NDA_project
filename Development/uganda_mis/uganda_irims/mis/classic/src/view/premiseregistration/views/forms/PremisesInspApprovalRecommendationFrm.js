/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PremisesInspApprovalRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisesinspapprovalrecommendationfrm',
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
            fieldLabel: 'Final Inspection Recommendation',
            name: 'approval_recommendation_id',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_premiseinspection_recommendations'
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
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        
        {
            xtype: 'textarea',
            fieldLabel: 'Inspection Remarks',
            name: 'approval_remarks',
            allowBlank: true
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Inspection Recommendation',
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