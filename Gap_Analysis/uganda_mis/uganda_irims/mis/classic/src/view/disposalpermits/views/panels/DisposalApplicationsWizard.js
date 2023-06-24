
Ext.define('Admin.view.disposalpermits.views.panels.DisposalApplicationsWizard', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.disposalapplicationswizard',
    
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',

    layout: 'card',
    
    height: 600,
    flex: 1,
    controller: 'disposalpermitsvctr',
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    viewModel: {
        type: 'disposalpermitsvm'
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        height: 40,
        defaults: {
            labelAlign: 'top',
            margin: '-12 5 0 5',
            labelStyle: "color:#595959;font-size:11px"
        },
        items: ['->', {
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
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            }, {
                xtype: 'hiddenfield',
                name: 'status_type_id'
            }, {
                xtype: 'hiddenfield',
                name: 'is_manager_query'
            }]
    }
],
    items: [
        {
            xtype: 'panel',
            autoScroll: true,
            dockedItems: [{
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'top',
                    margin: 3,
                    items: [
                        {
                            xtype: 'tbspacer',
                            width: 2
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Zone',
                            labelWidth: 50,
                            width: 400,
                            name: 'zone_id',
                            valueField: 'id',
                            displayField: 'name',
                            queryMode: 'local',
                            forceSelection: true,
                            listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            extraParams: {
                                                model_name: 'Zone'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            },
                            labelStyle: 'font-weight:bold'
                        }
                    ]
            }],
            items:[

                {
                            xtype: 'tabpanel',
                            //layout: 'fit',

                            defaults: {
                                margin: 3
                            },
                            items: [{
                                xtype: 'disposalapplicantdetailsfrm',
                                title: 'APPLICANT DETAILS'
                            },
                            {
                                xtype: 'disposalpermitsdetailspnl',
                                title: 'DISPOSAL DETAILS'
                            }]
                    }

            ]
            
        },
         {
            xtype: 'tabpanel',
            items: [{
                xtype: 'importexportdocuploadsgrid',
                title: 'Documents Submission'
            }]
        }, {
            xtype: 'productscreeninggrid',
            title: 'Prechecking'
        },{
            xtype: 'appinvoicepaymentspanel'
           
        }
    ],
    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            style: {
                "background-color": "#90c258"
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
                    pressed: true,iconAlign: 'top',
                    text: 'Disposal Applications Details(Applicant Details & Application Request)',
                    action: 'quickNav', max_step: 3,
                    wizard: 'disposalapplicationswizard',
                    handler: 'quickNavigation'
                },
                 {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,iconAlign: 'top',
                    text: 'Disposal Documents',
                    action: 'quickNav',max_step: 3,
                     wizard: 'disposalapplicationswizard',
                    handler: 'quickNavigation'
                },{
                    step: 2,
                    iconCls: 'fa fa-product-hunt',
                    enableToggle: true,iconAlign: 'top',
                    text: 'Screening Checklist Submission',
                    action: 'quickNav', max_step: 3,
                    wizard: 'disposalapplicationswizard',
                    handler: 'quickNavigation'
                }, 
				{
                    step: 3,
                    iconCls: 'fa fa-money',
                    enableToggle: true, max_step: 3,
                    text: 'Invoice & Payment Details',
                    action: 'quickNav',iconAlign: 'top',
                    wizard: 'disposalapplicationswizard',
                    handler: 'quickNavigation',
                }
            ]
        };
      
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: ['->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',max_step: 3,
                    bind: {
                        disabled: '{atBeginning}'
                    }, wizard: 'disposalapplicationswizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    action_url: 'saveDisposalApplicationDetails',
                    wizardpnl: 'disposalapplicationswizard',
                    handler: 'saveDisposaltReceivingBaseDetails'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'disposalapplicationsdashgridstr',
                    table_name: 'tra_disposal_applications',
                    winWidth: '50%',
                    hidden: true,
                    wizard:'disposalapplicationswizard',
                    handler: 'showDisposalReceivingApplicationSubmissionWin'
                },{
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },max_step: 3,
                    wizard: 'disposalapplicationswizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
