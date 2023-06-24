
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.RegistrationProductPreviewQueryWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.registrationproductpreviewqueryWizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    itemId: 'registrationproductpreviewqueryWizardId',
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
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },//drugproductdocuploadsgrid
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                hidden:true,
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
                    hidden:true,
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
                    hidden:true,
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
                    hidden:true,
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },  {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    hidden:true,
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
                },{
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Application Details',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'reference_no',
                            hidden: false,
                            readOnly: true,
                            columnWidth: 0.9
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            hidden: false,
                            text: 'Search',
                            tooltip: 'Select Application',
                            childXtype: 'allproductsappgrid',
                            winTitle:'Applications',
                            winWidth:'70%',
                            handlerFn: 'loadProductPreview',
                            handler: 'showregisteredProductsSearch'
                        }
                    ]
                }
            ]
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
            xtype: 'previewdrugsProductsDetailsPnl',
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
                            labelWidth: 110,
                            width: 400,
                            name: 'zone_id',
                            readOnly: true,
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
                        }, {
                            xtype: 'tbseparator',
                            width: 2
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Assessment Procedure',
                            name: 'assessment_procedure_id',
                            forceSelection: true,
                            readOnly: true,
                            queryMode: 'local',
                            valueField: 'id',labelWidth: 110,
                            width: 400,
                            displayField: 'name',
                            listeners: {
                                afterrender: {
                                    fn: 'setConfigCombosStore',
                                    config: {
                                        pageSize: 10000,
                                        proxy: {
                                            url: 'configurations/getRegistrationApplicationParameters',
                                            extraParams: {
                                                table_name: 'par_assessment_procedures'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            }
                
                        },
                    ]
                }
            ],

        }, {
            xtype: 'tabpanel',
            items: [{
                xtype: 'productDocUploadsGrid',
                title: 'Product Application Documents Submission'
            }]
        },
        {
            xtype: 'adhocqueryresponsesgrid',//change here
            title: 'Query Reponse',
            autoScroll: true,
            listeners: {
                activate: 'loadAdhocQueryGrid'
            }
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
                    text: 'Applicant & Local Agent Details',
                    action: 'quickNav',
                    wizard:'registrationproductpreviewqueryWizard',
                    handler: 'quickNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Products Details',
                    action: 'quickNav', 
                    wizard:'registrationproductpreviewqueryWizard',
                    handler: 'quickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Product Application Documents Submission',
                    action: 'quickNav', 
                    wizard:'registrationproductpreviewqueryWizard',
                    handler: 'quickNavigation'
                },{
                    step: 3,
                    iconCls: 'fa fa-edit',
                    enableToggle: true,
                    text: "Query Reponse",
                    action: 'quickNav', 
                    wizard:'registrationproductpreviewqueryWizard',
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
                    wizard:'registrationproductpreviewqueryWizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'productregistrationstr',
                    table_name: 'tra_product_applications',
                    winWidth: '50%',
                    wizard:'registrationproductpreviewqueryWizard',
                    handler: 'showPreviewApplicationSubmissionWin'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    wizard:'registrationproductpreviewqueryWizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
