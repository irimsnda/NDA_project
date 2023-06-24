/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.LicenceApplicationReceivingPermitsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.licenceapplicationreceivingpermitswizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],viewModel: {
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
            height: 55,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
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
                        'font-size': '12px',  'margin-top': '-2px'
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
                        'font-size': '12px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'tracking_no',
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
                }]
        }
    ],
    items: [{
            xtype: 'importexportdetailspnl',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    dock: 'top',
                    margin: 3,
                    items: [
                        {
                            xtype: 'tbseparator',
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
                        },'->',{
                            xtype: 'fieldcontainer',
                            layout: 'column',
                           
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'reference_no',
                                    hidden: false,fieldLabel: 'Visa Application Details',
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
                                    childXtype: 'allapprovedvisaapplicationsgrid',
                                    winTitle:'Approved Visa Applications',
                                    winWidth:'70%',
                                    handler: 'showIEApplicationsSelectionList'
                                }
                            ]
                        }
                    ]
                }
            ],
        },{
            xtype: 'licensepermitsproductsgrid',
            title: 'Permit Products Details',
         },  {
            xtype: 'importexportdocuploadsgrid',
            title: 'Documents Submission'
        },{
            xtype: 'productscreeninggrid',
            title: 'Import/Export Permit Prechecking'
        },{
            xtype: 'appinvoicepaymentspanel'
           
        },{
            xtype: 'importexportapplicantdetailsfrm',
            hidden: true,
            title: 'APPLICANT DETAILS'
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
                    enableToggle: true,iconAlign: 'top',
                    text: 'License Application Details',max_step:4,
                    action: 'quickNav', wizard: 'licenceapplicationreceivingpermitswizard',
                    handler: 'quickNavigation'
                },{
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,iconAlign: 'top',
                    text: 'License Product Details',max_step:4,
                    action: 'quickNav', wizard: 'licenceapplicationreceivingpermitswizard',
                    handler: 'quickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,max_step: 4,
                    text: 'License Documents Submission',
                    action: 'quickNav', iconAlign: 'top',
                    wizard: 'licenceapplicationreceivingpermitswizard',
                    handler: 'quickNavigation'
                }, {
                    step: 3,
                    iconCls: 'fa fa-product-hunt',
                    enableToggle: true,max_step: 4,
                    text: 'License Prechecking Checklist',
                    action: 'quickNav', iconAlign: 'top',
                    wizard: 'licenceapplicationreceivingpermitswizard',
                    handler: 'quickNavigation'
                },{
                    step: 4,
                    iconCls: 'fa fa-money',
                    enableToggle: true,max_step: 4,
                    text: 'Invoice & Payment Details',
                    action: 'quickNav',iconAlign: 'top',
                    wizard: 'licenceapplicationreceivingpermitswizard',
                    handler: 'quickNavigation',
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
                    ui: 'soft-purple',max_step:4,
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard:'licenceapplicationreceivingpermitswizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save/Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn', 
                    form_panel:'#importexportdetailsfrm',
                    action_url: 'saveImportPermittReceivingBaseDetails',
                    wizard: 'licenceapplicationreceivingpermitswizard',
                    handler: 'saveImporExportPermitReceivingBaseDetails'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'drugproductregistrationstr',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%',
                   hidden: true,
                    handler: 'showReceivingApplicationSubmissionWin'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    max_step:4,
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'licenceapplicationreceivingpermitswizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
