
/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.disposalpermits.views.panels.OnlineDisposalApplicationsWizard', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.onlinedisposalapplicationswizard',
    
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
            xtype: 'disposalapplicantdetailsfrm',
            title: 'APPLICANT DETAILS'
        },
        {
            xtype: 'onlinedisposalpermitsdetailspnl',//onlinefoodproductsdetailspnl
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
                xtype: 'onlineimportexportdocuploadsgrid',
                title: 'Documents Submission'
            }]
        }, {
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
                    pressed: true,
                    text: 'Applicant Details',
                    action: 'quickNav', 
                    wizard: 'onlinedisposalapplicationswizard',
                    handler: 'quickNavigationonlineprev'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Disposal Applications Details',
                    action: 'quickNav', 
                    wizard: 'onlinedisposalapplicationswizard',
                    handler: 'quickNavigationonlineprev'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Disposal Documents Submission',
                    action: 'quickNav',
                     wizard: 'onlinedisposalapplicationswizard',
                    handler: 'quickNavigationonlineprev'
                },{
                    step: 3,
                    iconCls: 'fa fa-product-hunt',
                    enableToggle: true,
                    text: 'Disposal Permit Invoice Generation',
                    action: 'quickNav', 
                    wizard: 'onlinedisposalapplicationswizard',
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
                    }, wizard: 'onlinedisposalapplicationswizard',
                    handler: 'onPrevCardClickOnline'
                },{
                    text: ' Pre-Checking Recommendation',
                    ui: 'soft-red',
                    iconCls: 'fa fa-save',
                    name: 'prechecking_recommendation',
                    
                },
                {
                    text: 'Save Screening Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    hidden: true
                },{
                    text: 'Receive & Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa  fa-thumbs-up',
                    winWidth: '50%', 
                    hidden: true,
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
                    wizard: 'onlinedisposalapplicationswizard',
                    handler: 'onNextCardClickOnline'
                }
            ]
        };
        me.callParent(arguments);
    }
});
