/**
 * Created by Kip on 11/13/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.NewSinglePremiseApprovalWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newsinglepremiseapprovalwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    viewModel: 'premiseregistrationvm',
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'applicantdetailsfrm'
        },
        {
            xtype: 'premisedetailstabpnl'
        },
        {
            xtype: 'approvalspaymentspnl'
        },
        {
            xtype: 'foodpremscreeninggrid'
        },
        {
            xtype: 'foodpreminspectionchecklistgrid'
        },
        {
            xtype: 'foodpremevaluationchecklistgrid'
        },
        {
            xtype: 'approvaluploadeddocsgrid'
        },
        {
            xtype: 'approvalcommentsgrid'
        }
    ],

    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
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
                    text: 'APPLICANT',
                    action: 'quickNav',
                    handler: 'quickNavigationApproval'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'PREMISE',
                    action: 'quickNav',
                    handler: 'quickNavigationApproval'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-money',
                    enableToggle: true,
                    text: 'PAYMENT',
                    action: 'quickNav',
                    handler: 'quickNavigationApproval'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'PRE-CHECKING',
                    action: 'quickNav',
                    handler: 'quickNavigationApproval'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-cogs',
                    enableToggle: true,
                    text: 'INSPECTION',
                    action: 'quickNav',
                    handler: 'quickNavigationApproval'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-cogs',
                    enableToggle: true,
                    text: 'EVALUATION',
                    action: 'quickNav',
                    handler: 'quickNavigationApproval'
                },
                {
                    step: 6,
                    iconCls: 'fa fa-file',
                    enableToggle: true,
                    text: 'DOCUMENTS',
                    action: 'quickNav',
                    handler: 'quickNavigationApproval'
                },
                {
                    step: 7,
                    iconCls: 'fa fa-weixin',
                    enableToggle: true,
                    text: 'COMMENTS',
                    action: 'quickNav',
                    handler: 'quickNavigationApproval'
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
                        disabled: '{atBeginningApproval}'
                    },
                    handler: 'onPreviousClickApproval'
                },
                {
                    xtype: 'transitionsbtn'
                },
                {
                    text: 'Reports',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-sliders',
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                                text: 'Inspection',
                                iconCls: 'x-fa fa-clipboard',
                                action: 'inspection_report',
                                handler: 'printManagersReport',
                                report_type: 'Inspection Report'
                            },
                            {
                                text: 'Evaluation',
                                iconCls: 'x-fa fa-clipboard',
                                action: 'inspection_report',
                                handler: 'printManagersReport',
                                report_type: 'Evaluation Report'
                            }
                        ]
                    }
                },
                '->',
                {
                    text: 'Recommendation',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-chevron-circle-up',
                    stores: '["approvaldecisionsstr"]',
                    table_name: 'tra_premises_applications',
                    name: 'show_recommendation'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'approvalsstr',//'foodpremiseregistrationstr',
                    table_name: 'tra_premises_applications',
                    winWidth: '50%'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEndApproval}'
                    },
                    handler: 'onNextClickApproval'
                }
            ]
        };
        me.callParent(arguments);
    }
});
