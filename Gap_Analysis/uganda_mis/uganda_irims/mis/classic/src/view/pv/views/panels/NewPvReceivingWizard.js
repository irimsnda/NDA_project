Ext.define('Admin.view.pv.views.panels.NewPvReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newPvReceivingWizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    itemId: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-blue',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            // hidden: true,
            ui: 'footer',
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },//drugproductdocuploadsgrid
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                },{
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },  {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'hiddenfield',
                    name: 'process_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'workflow_stage_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'status_type_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'is_manager_query'
                }, {
                    xtype: 'hiddenfield',
                    name: 'prodclass_category_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'invoice_id'
                }
            ]
        }
    ],
    items: [{
            xtype: 'tabpanel',
            layout: 'fit',
            defaults: {
                margin: 3
            },
            items: [{
                xtype: 'productapplicantdetailsfrm',
                title: 'Reporter Details'
            }]
        },
        {
            xtype: 'pvDetailsPnl',
        }, {
            xtype: 'tabpanel',
            items: [{
                xtype: 'productDocUploadsGrid',
                title: 'Application Documents Submission'
            }]
        },
        {
            xtype: 'productscreeninggrid',
            title: 'Prechecking'
        }
    ],
    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-blue',
            cls: 'wizardprogressbar',
            style: {
                "color": "#90c258"
            },
            bodyStyle: {
                "background-color": "#90c258"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'Reporter Details',
                    action: 'quickNav',
                    wizard:'newPvReceivingWizard',
                    handler: 'quickNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Report Details',
                    action: 'quickNav', 
                    wizard:'newPvReceivingWizard',
                    handler: 'quickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Supporting Documents',
                    action: 'quickNav', 
                    wizard:'newPvReceivingWizard',
                    handler: 'quickNavigation'
                },{
                    step: 3,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: "Details Prechecking",
                    action: 'quickNav', 
                    // hidden: true,
                    wizard:'newPvReceivingWizard',
                    handler: 'quickNavigation'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Back to List',
                    ui: 'soft-blue',
                    iconCls: 'fa fa-bars',
                    name: 'back_to_list',
                    hidden: true
                },
                {
                    text: 'Previous',
                    ui: 'soft-blue',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard:'newPvReceivingWizard',
                    handler: 'onPrevCardClick'
                },
                '->',
                {
                    text: 'Save Patient Details',
                    ui: 'soft-blue',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    action_url: 'savePvReceivingBaseDetails',
                    wizard: 'newPvReceivingWizard',
                    handler: 'savePvReceivingBaseDetails'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-blue',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'pvStr',
                    table_name: 'tra_pv_applications',
                    winWidth: '50%',
                    wizard:'newPvReceivingWizard'
                },
                {
                    text: 'Next',
                    ui: 'soft-blue',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'newPvReceivingWizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
