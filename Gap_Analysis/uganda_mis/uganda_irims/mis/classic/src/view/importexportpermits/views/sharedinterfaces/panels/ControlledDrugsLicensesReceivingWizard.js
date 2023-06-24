/**
 * Created by softclans
 * user robinson odhiambo
 * Kip on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.ControlledDrugsLicensesReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.controlleddrugslicensesreceivingwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizard three shadow',
    colorScheme: 'soft-green',
    dockedItems: [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
                
            height: 40,
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
            xtype: 'importexportapplicantdetailsfrm',
            title: 'APPLICANT DETAILS'
        },
        {
            xtype: 'controlleddrugslicensedetailspnl',//onlinefoodproductsdetailspnl
        }, {
            xtype: 'tabpanel',
            items: [{
                xtype: 'importexportdocuploadsgrid',
                title: 'Documents Submission'
            }]
        },{
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
                    pressed: true,iconAlign:'top',
                    text: 'Applicant',
                    action: 'quickNav',
                    wizard: 'controlleddrugslicensesreceivingwizard',
                    handler: 'quickNavigation'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,iconAlign:'top',
                    text: 'Controlled Drugs Permit Details',
                    action: 'quickNav', wizard: 'controlleddrugslicensesreceivingwizard',
                    handler: 'quickNavigation'
                }, {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,iconAlign:'top',
                    text: 'Controlled Drugs Permits Documents',
                    action: 'quickNav', 
                    wizard: 'controlleddrugslicensesreceivingwizard',
                    handler: 'quickNavigation'
                },{
                    step: 3,
                    iconCls: 'fa fa-money',iconAlign:'top',
                    enableToggle: true,iconAlign:'top',
                    text: 'Invoice & Payment Details',
                    action: 'quickNav',
                    wizard: 'controlleddrugslicensesreceivingwizard',
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
                    wizard:'controlleddrugslicensesreceivingwizard',
                    handler: 'onPrevCardClick'
                },
                {
                    text: 'Save/Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    action_url: 'saveControlDrugsReceivingBaseDetails',
                    wizard: 'controlleddrugslicensesreceivingwizard',
                    form_panel:'#importexportdetailsfrm',
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
                    },wizard:'controlleddrugslicensesreceivingwizard',
                    handler: 'onNextCardClick'
                }
            ]
        };
        me.callParent(arguments);
    }
});
