
/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.food.new.onlinefoodproductreceivingwizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.onlinefoodproductreceivingwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    
    height: 600,
    //bodyPadding: 3,
    flex: 1,
    controller: 'productregistrationvctr',
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    viewModel: {
        type: 'productregistrationvm'
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
            xtype: 'tbspacer',
            width: 20
        },{
            xtype: 'displayfield',
            name: 'process_name',
            value: '****',
            fieldLabel: 'Process',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px',
                'margin-top': '-2px'
            }

        },  {
                xtype: 'tbspacer',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'application_status',
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                                         'font-size': '12px',                     'margin-top': '-2px'
                }
            }, {
                xtype: 'tbspacer',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'tracking_no',
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                                         'font-size': '12px',                     'margin-top': '-2px'
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
            xtype: 'tabpanel',
            //layout: 'fit',

            defaults: {
                margin: 3
            },
            items: [{
                xtype: 'productapplicantdetailsfrm',
                title: 'APPLICANT DETAILS'
            },
            {
                xtype: 'productlocalapplicantdetailsfrm',
                title: 'LOCAL TECHNICAL REPRESENTATIVE DETAILS'
            }]
        },
        {
            xtype: 'onlinefoodproductsdetailspnl',
            dockedItems: [
                {
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
                }
            ],

        }, {
            xtype: 'tabpanel',
            items: [{
                xtype: 'onlineproductdocuploadsgrid',
                title: 'Product Application Documents Submission'
            }]
        },{
            xtype: 'panel',
            name: 'checklist_gridpanel',
            layout: 'fit',
            items:[{
                xtype: 'productapplicationqueriesgrid',
                name: 'querieschecklistgrid',
                hidden: true
            },{
                xtype: 'productscreeninggrid',
                name: 'productonlinescreeninggrid'
            }]
        },{
            xtype: 'onlineappinvoicepaymentspanel'
           
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
                    text: 'Applicant & Local Technical Representative Details',
                    action: 'quickNav',iconAlign: 'top',
                    wizard: 'onlinefoodproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Products Details',
                    action: 'quickNav', iconAlign: 'top',
                    wizard: 'onlinefoodproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Product Application Documents Submission',
                    action: 'quickNav', iconAlign: 'top',
                    wizard: 'onlinefoodproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                },{
                    step: 3,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'PRE-CHECKING',
                    action: 'quickNav',iconAlign: 'top',
                    wizard: 'onlinefoodproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                }, {
                    step: 4,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Invoice & Payment Details',
                    action: 'quickNav',iconAlign: 'top',
                    wizard: 'onlinefoodproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                }
            ]
        };
        
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    }, wizard: 'onlinefoodproductreceivingwizard',
                    handler: 'onPrevCardClickOnline'
                },
                {
                    text: 'Actions',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'actions',
                    hidden: true,
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                                text: 'Dismiss Rejection And Receive Application',
                                iconCls: 'x-fa fa-arrow-right',
                                name: 'action_dismiss1',
                                handler: 'receiveOnlineApplicationDetailsFrmBtn',
                                storeID: 'onlinepremregistrationstr',
                                winWidth: '50%'
                            },
                            '-',
                            {
                                text: 'Dismiss Rejection And Send To Rejecting Officer',
                                iconCls: 'x-fa fa-arrow-right',
                                name: 'action_dismiss2',
                                handler: 'submitManagerRejectedOnlineApplicationFrmBtn',
                                application_status: 24
                            },
                            '-',
                            {
                                text: 'Approve Rejection And Send Application To Trader',
                                iconCls: 'x-fa fa-arrow-right',
                                name: 'action_approve',
                                handler: 'submitManagerRejectedOnlineApplicationFrmBtn',
                                application_status: 18
                            }
                        ]
                    }
                },
                {
                    text: 'Previous Rejections',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-down',
                    hidden: true,
                    name: 'prev_rejections',
                    handler: 'showOnlineApplicationRejections',
                    childXtype: 'onlineappsrejectionsgrid',
                    winWidth: '60%'
                },{
                    text: 'Preview Queries',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'x-fa fa-bars',
                    name: 'preview_queries_btn',
                    handler: 'previewQueriesFromOnlineApp'
                }, {
                    text: 'Reject Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-thumbs-down',
                    name: 'save_btn',
                    handler: 'submitWinRejectedOnlineApplication',
                    action: 'reject_app',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },{
                    text: 'Update Product Application',
                    ui: 'soft-green',
                    iconCls: 'fa  fa-thumbs-up',
                    winWidth: '50%', 
                    storeID: 'onlineproductregistrationstr',
                    winWidth: '50%',
                    wizard: 'onlinedrugproductreceivingwizard',
                    name: 'save_productapplications',
                }, {
                    text: ' Pre-Checking Recommendation',
                    ui: 'soft-red',
                    iconCls: 'fa fa-save',
                    name: 'prechecking_recommendation',
                    
                }, 
                '->',
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    wizard: 'onlinefoodproductreceivingwizard',
                    handler: 'onNextCardClickOnline'
                },{
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa  fa-thumbs-up',
                    winWidth: '50%',hidden: true,is_invoicecheck:true,
                    storeID: 'onlineproductregistrationstr',
                    winWidth: '50%',
                    name: 'submit_btn',  
                }
            ]
        },
        me.callParent(arguments);
    }
});
