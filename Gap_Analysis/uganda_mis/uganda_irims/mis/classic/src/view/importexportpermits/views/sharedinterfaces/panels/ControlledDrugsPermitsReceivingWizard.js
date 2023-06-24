/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ControlledDrugsPermitsReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.controlleddrugspermitsreceivingwizard',
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
                    'font-size': '13px',  'margin-top': '-2px'
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
                        'font-size': '13px',  'margin-top': '-2px'
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
                        'font-size': '13px',  'margin-top': '-2px'
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
                        'font-size': '13px',  'margin-top': '-2px'
                    }
                }, {
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Reference No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '13px',  'margin-top': '-2px'
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
                    name: 'importexport_permittype_id'
                }]
        }
    ],
    items: [{
            xtype: 'importexportapplicantdetailsfrm',
            title: 'APPLICANT DETAILS'
        },
        {
            xtype: 'controlleddrugsimpdetailspnl',//
        }, {
            xtype: 'importexportdocuploadsgrid',
                title: 'Documents Submission'
        },{
            // title: 'Invoie & Payment Details',
            xtype: 'appinvoicepaymentspanel'
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
                "background-color": "#fff"
            },
            layout: {
                pack: 'center'
            },
            height: 55,
            defaults:{
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '13px',  'margin-top': '-2px'
                }
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    iconAlign:'top',
                    text: 'Applicant Details',
                    action: 'quickNav',
                    wizard: 'controlleddrugspermitsreceivingwizard',
                    handler: 'quickNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true, iconAlign:'top',
                    text: 'Import/Export Permit Details',
                    action: 'quickNav', 
                    wizard: 'controlleddrugspermitsreceivingwizard',
                    handler: 'quickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true, iconAlign:'top',
                    text: 'Permit Documents Submission',
                    action: 'quickNav', 
                    wizard: 'controlleddrugspermitsreceivingwizard',
                    handler: 'quickNavigation'
                },{
                    step: 3,
                    iconCls: 'fa fa-money',
                    enableToggle: true,iconAlign:'top',
                    text: 'Invoice & Payment Details',
                    action: 'quickNav',
                    wizard: 'controlleddrugspermitsreceivingwizard',
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
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    wizard:'controlleddrugspermitsreceivingwizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save/Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn', hidden: true,
                    form_panel:'#importexportdetailsfrm',
                    action_url: 'saveImportPermittReceivingBaseDetails',
                    wizard: 'controlleddrugspermitsreceivingwizard',
                    handler: 'saveImporExportPermitReceivingBaseDetails'
                },{
                    text: 'Receiving Recommendation',
                    ui: 'soft-red', 
                    hidden: true,
                    iconCls: 'fa fa-save',
                    name: 'prechecking_recommendation'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple', hidden:false,
                    iconCls: 'fa fa-check',
                    name: 'processreceiving_submission_btn',
                    table_name: 'tra_importexport_applications',
                    winWidth: '50%',
                    handler: 'showReceivingApplicationSubmissionWin'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },wizard:'controlleddrugspermitsreceivingwizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
