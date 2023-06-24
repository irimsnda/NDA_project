/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.cosmetics.OnlineAltCosmeticsProductReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.onlinealtcosmeticsproductreceivingwizard',
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
                }, {
                    xtype: 'hiddenfield',
                    name: 'last_query_ref_id'
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
                title: 'LOCAL AGENT DETAILS'
            }]
        },
        {
            xtype: 'onlinecosmeticsproductsdetailspnl',
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
                            readOnly: true,
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
        },
        {
            xtype: 'productvariationrequestsonlinegrid'//'premisescreeninggrid'
        },
        {
            xtype: 'panel',
            name: 'checklist_gridpanel',
            layout: 'fit',
            items:[{
                xtype: 'productapplicationqueriesgrid',//'premisescreeninggrid'
                name: 'querieschecklistgrid',
                hidden: true
            },{
                xtype: 'productonlinescreeninggrid',
                name: 'productonlinescreeninggrid'//'premisescreeninggrid'
            }]

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
                    pressed: true,
                    text: 'Applicant & Local Agent Details',
                    action: 'quickNav',
                    wizard: 'onlinealtcosmeticsproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Products Details',
                    action: 'quickNav', 
                    wizard: 'onlinealtcosmeticsproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Product Application Documents Submission',
                    action: 'quickNav', 
                    wizard: 'onlinealtcosmeticsproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                },{
                    step: 3,
                    iconCls: 'fa fa-close',
                    enableToggle: true,
                    text: 'VARIATION REQUESTS',
                    wizard: 'onlinealtcosmeticsproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                },{
                    step: 4,
                    iconCls: 'fa fa-edit',
                    enableToggle: true,
                    text: "Products's Details Prechecking",
                    action: 'quickNav', 
                    wizard:'onlinealtcosmeticsproductreceivingwizard',
                    handler: 'quickNavigationonlineprev'
                }, {
                    step: 5,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Invoice & Payment Details',
                    action: 'quickNav',iconAlign: 'top',
                    wizard: 'onlinealtcosmeticsproductreceivingwizard',
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
                    }, wizard: 'onlinealtcosmeticsproductreceivingwizard',
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
                    name: 'save_btn',hidden: true,
                    handler: 'submitWinRejectedOnlineApplication',
                    action: 'reject_app',
                   
                }, {
                    text: 'Update Product Application',
                    ui: 'soft-purple',
                    iconCls: 'fa  fa-thumbs-up',
                    winWidth: '50%', hidden: true,
                    storeID: 'onlineproductregistrationstr',
                    winWidth: '50%',
                    wizard: 'onlinemedicaldevicesreceivingwizard',
                    name: 'save_productapplications',
                },'->',{
                    text: 'Receive & Invoice Application',
                    ui: 'soft-purple',
                    iconCls: 'fa  fa-print',
                    winWidth: '50%',hidden: true,
                    storeID: 'onlineproductregistrationstr',
                    winWidth: '30%',
                    name: 'receive_invoicebtn'
                }, {
                    text: 'Print Invoice',
                    ui: 'soft-purple',
                    name: 'print_invoice',hidden: true,
                    iconCls: 'fa fa-print',
                    report_type: 'Invoice'
                },{
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa  fa-thumbs-up',
                    winWidth: '50%',hidden: true,is_invoicecheck:false,
//handler: 'receiveWinOnlineApplicationDetails',
                    storeID: 'onlineproductregistrationstr',
                    winWidth: '50%',
                    name: 'submit_btn',
                    
                },
                {
                    text: 'Save Pre-Checking Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    hidden: true,
                },{
                    text: ' Pre-Checking Recommendation',
                    ui: 'soft-red',
                    iconCls: 'fa fa-save',
                    name: 'prechecking_recommendation',
                    
                },
                {
                    text: 'Query Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-question',
                    hidden: true,
                    handler: 'queryWinOnlineApplication',
                    action: 'query_app',
                   
                },{
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    wizard: 'onlinealtcosmeticsproductreceivingwizard',
                    handler: 'onNextCardClickOnline'
                }
            ]
        },
        me.callParent(arguments);
    }
});
