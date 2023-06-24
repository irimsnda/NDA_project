/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.DeclaredPoeInspectionsDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.declaredpoeinspectionsdetailswizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    viewModel: {
        type: 'importexportpermitsvm'
    },
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 60,
            defaults: {
                labelAlign: 'left',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:10px"
            },
            items: ['->',  {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '10px'
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
                        'font-size': '10px'
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
                        'font-size': '10px'
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
                        'font-size': '10px'
                    }
                },  {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Ref No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '10px'
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
                },  {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'poe_application_id'
                }]
        }
    ],
    items: [{
            xtype: 'declaredinspectionimportexportdetailspnl',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'top',
                    margin: 3,
                    items: [{
                            xtype: 'displayfield',
                            name: 'permit_expiry_date',
                            fieldLabel: 'Permit Expiry Date',
                            labelWidth: 120,
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold',
                                'font-size': '12px'
                            }
                        },{
                            xtype: 'displayfield',
                            name: 'verification_status',
                            fieldLabel: 'Permit Verification Status',
                            labelWidth: 120,
                            fieldStyle: {
                                'color': 'green',
                                'font-weight': 'bold',
                                'font-size': '12px'
                            }
                        },
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
                            hidden: true,
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
                        },'->',{
                            fieldLabel:'Permit No/Reference No',
                            name:'permit_no',
                            xtype:'textfield',
                            labelWidth: 108,
                            emptytext:'Enter Full Permit No',
                            width: 450
                        }
                    ]
                }
            ],
        }, {
            xtype: 'declaredpoeinspectiondetailspnl',
            title: 'POE Inspection Details'
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
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Preview Import/Export Permit Details',
                    action: 'quickNav', wizard: 'declaredpoeinspectionsdetailswizard',
                    handler: 'quickNavigationPOE'
                }, {
                    step: 1,
                    iconCls: 'fa fa-product-hunt',
                    enableToggle: true,
                    text: 'Import/Export Permit Inspection',
                    action: 'quickNav', 
                    wizard: 'declaredpoeinspectionsdetailswizard',
                    handler: 'quickNavigationPOE'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Back to List',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'back_to_list',
                    hidden: true
                },
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard:'declaredpoeinspectionsdetailswizard',
                    handler: 'onPrevCardClickPOE'
                }, {
                    text: 'Verify/Reject Permit',
                    winTitle:'Permit Verification',
                    childXtype: 'poeinspectionverificationfrm',
                    winWidth: '30%',
                    name:'btnverify_permit',
                    handler: 'funcVerifyImportPermit'
                },{
                    text: 'Complete and Close',
                    childXtype: 'poeinspectionrecommendationfrm',
                    winTitle:'Inspection Recommendation',
                    winWidth: '30%',
                    name: 'process_submission_btn',
                    handler: 'showReceivingPoeApplicationSubmissionWin'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'declaredpoeinspectionsdetailswizard',
                    handler: 'onNextCardClickPOE'
                }
            ]
        };
        me.callParent(arguments);
    }
});
