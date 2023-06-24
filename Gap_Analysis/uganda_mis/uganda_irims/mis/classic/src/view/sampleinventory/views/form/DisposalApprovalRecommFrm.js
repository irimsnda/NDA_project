
Ext.define('Admin.view.sampleinventory.views.form.DisposalApprovalRecommFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'disposalapprovalrecommfrm',
    layout: 'form',
    controller: 'sampleinventoryvctr',
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
            name: 'item_reference_no'
        },
        {
            xtype: 'hiddenfield',
            name: 'recommendation_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'item_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'inventory_id'
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
                    fn: 'setUserCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_inventorydisposal_decisions'//'par_inventorydisposal_decisions'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function (cmb, newVal) {

                    var form = cmb.up('form'),
                        reason_for_rejection = form.down('htmleditor[name=reason_for_rejection]');
                        comment = form.down('textarea[name=comment]');

                    if (newVal == 1 || newVal === 1) {

                        reason_for_rejection.setVisible(false);
                        comment.setVisible(true);

                    } else {
                        
                        reason_for_rejection.setVisible(true);
                        comment.setVisible(false);

            
                    }
                },
                afterrender: function () {
                    var store = this.getStore();
                    store.load();
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
            xtype: 'textarea',
            fieldLabel: 'Comment',
            name: 'comment',
            allowBlank: true
        },
        {
                xtype: 'htmleditor',
                name:'reason_for_rejection',
                maxWidth: 580,
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
            name: 'save_recommendations',
            handler: 'save_recommendation'
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