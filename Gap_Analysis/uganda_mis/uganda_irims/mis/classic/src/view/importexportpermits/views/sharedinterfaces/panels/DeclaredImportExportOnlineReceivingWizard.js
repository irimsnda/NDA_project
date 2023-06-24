
/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panel.Declaredimportexportonlinereceivingwizard', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.declaredimportexportonlinereceivingwizard',
    
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',

    layout: 'card',
    
    height: 600,
    flex: 1,
    controller: 'importexportpermitsvctr',
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    viewModel: {
        type: 'importexportpermitsvm'
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
            xtype: 'importexportapplicantdetailsfrm',
            title: 'APPLICANT DETAILS'
        },
        {
            xtype: 'declaredonlineimportexportdetailspnl',//onlinefoodproductsdetailspnl
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
                xtype: 'declaredimportexportdocuploadsgrid',
                title: 'Documents Submission'
            }]
        },
        {
            xtype: 'tabpanel',
            items:[{
                        xtype: 'importexportonlinescreeninggrid',
                         title: 'Import/Export Permit Prechecking'
                }
            ] 
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
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
                    text: 'Applicant Details',
                    action: 'quickNav', 
                    wizard: 'declaredimportexportonlinereceivingwizard',
                    handler: 'quickDeclarationNavigationonlineprev'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Import/Export permit Details',
                    action: 'quickNav', 
                    wizard: 'declaredimportexportonlinereceivingwizard',
                    handler: 'quickDeclarationNavigationonlineprev'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Import/Export permit Documents Submission',
                    action: 'quickNav',
                     wizard: 'declaredimportexportonlinereceivingwizard',
                    handler: 'quickDeclarationNavigationonlineprev'
                },{
                    step: 3,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'PRE-CHECKING',
                    action: 'quickNav',
                    wizard: 'declaredimportexportonlinereceivingwizard',
                    handler: 'quickDeclarationNavigationonlineprev'
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
                    }, wizard: 'declaredimportexportonlinereceivingwizard',
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
                                storeID: 'onlineimportexportappsstr',
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
                },{
                    text: 'Preview Queries',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'x-fa fa-bars',
                    name: 'preview_queries_btn',
                    handler: 'previewQueriesFromOnlineApp'
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
                }, '->',
                {
                    text: 'Query Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-question',
                    handler: 'queryWinOnlineApplication',
                    action: 'query_app',
                    hidden: true
                    
                },
                {
                    text: 'Reject Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-thumbs-down',
                    name: 'save_btn', hidden: true,
                    handler: 'submitWinRejectedOnlineApplication',
                    action: 'reject_app'
                   
                },{
                    text: 'Update Permits Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn', 
                    form_panel:'#importexportdetailsfrm',
                    action_url: 'updateonlineImportPermittReceivingBaseDetails',
                    wizard: 'declaredimportexportonlinereceivingwizard',
                    handler: 'updateOnlineImporExportPermitReceivingBaseDetails'
                },{
                    text: 'Save Pre-Checking Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    hidden: true
                },{
                    text: ' Pre-Checking Recommendation',
                    ui: 'soft-red',
                    iconCls: 'fa fa-save',
                    name: 'prechecking_recommendation'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa  fa-thumbs-up',
                    winWidth: '50%', 
                    hidden: true,
                    //handler: 'receiveWinOnlineApplicationDetails',
                    storeID: 'onlineimportexportappsstr',
                    winWidth: '50%',
                    name: 'submit_btn',
                   
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    wizard: 'declaredimportexportonlinereceivingwizard',
                    handler: 'onNextCardClickOnline'
                }
            ]
        };
        me.callParent(arguments);
    }
});
