
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ImportExportAppEdittingwizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.importexportedittingswizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    itemId: 'importexportedittingswizardId',
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
                labelAlign: 'right',
                labelStyle: "color:#595959",
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                hidden: true,
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                    xtype: 'tbspacer',
                    //width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    hidden: true,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'tbspacer',
                    //width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'application_status',
                    hidden: true,
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'tbspacer',
                    //width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    hidden: true,
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Reference No',
                    hidden: true,
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px',  'margin-top': '-2px'
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
                },{
                    xtype: 'hiddenfield',
                    name: 'registration_status'
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
                            name: 'select_applications',
                            childXtype: 'allimportexportappgrid',
                            winTitle:'Import/Export Applications',
                            winWidth:'70%',
                            handler: 'showIEApplicationsSelectionList'
                        }
                    ]
                }]
        }
    ],
    items: [
    // {
    //         xtype: 'importexportapplicantdetailsfrm',
    //         title: 'APPLICANT DETAILS'
    //     },
        {
            xtype: 'editimportexportdetailspnl',//onlinefoodproductsdetailspnl
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
                xtype: 'importexportextentiondocuploadsgrid',
                title: 'Documents Submission'
            },{
                xtype: 'previousimportexportdocuploadsgrid',
                title: 'Previous Documents Submission'
            }]
        },{
            xtype: 'extensionimportexportapppnl',
            title: 'Import/Export Permit Extention'
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
                // {
                //     step: 0,
                //     iconCls: 'fa fa-user',
                //     enableToggle: true,
                //     pressed: true,
                //     text: 'Applicant',
                //     action: 'quickNav',
                //     wizard: 'importexportedittingswizard',
                //     handler: 'quickNavigation'
                // },
                {
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    pressed: true,
                    text: 'Import/Export Permit Details',
                    action: 'quickNav', 
                    wizard: 'importexportedittingswizard',
                    handler: 'quickNavigation'
                }, {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Import/Export permit Documents Submission',
                    action: 'quickNav', 
                    wizard: 'importexportedittingswizard',
                    handler: 'quickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-product-hunt',
                    enableToggle: true,
                    text: 'Import/Export Permit Extension',
                    action: 'quickNav', 
                    wizard: 'importexportedittingswizard',
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
                    wizard:'importexportedittingswizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    disabled: false,
                    wizard: 'importexportedittingswizard',
                    handler: 'saveImporExportPermitReceivingEditDetails'
                },
                {
                    text: 'Save Extension Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_extension_btn',
                    disabled: false,
                    wizard: 'importexportedittingswizard',
                    handler: 'saveImporExportAppExtensionEditDetails'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    wizard:'importexportedittingswizard',
                    handler: 'onNextCardClick'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    name: 'save_screening_btn',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    hidden: true,
                    wizard:'importexportedittingswizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
