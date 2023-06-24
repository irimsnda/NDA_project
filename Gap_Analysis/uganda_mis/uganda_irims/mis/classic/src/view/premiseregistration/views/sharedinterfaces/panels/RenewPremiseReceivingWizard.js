/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.RenewPremiseReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.renewpremisereceivingwizard',
    viewModel: 'premiseregistrationvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'applicationpremisepnl'
        },
        {
            xtype: 'applicantdetailsfrm'
        },
        {
            xtype: 'premregappdocuploadsgenericgrid'
        },
        {
            xtype: 'productscreeninggrid'
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
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-university',
                    pressed: true,
                    enableToggle: true,iconAlign:'top',
                    
                    text: 'PREMISE DETAILS',
                    wizard_pnl: 'renewpremisereceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-user',
                    enableToggle: true,iconAlign:'top',
                    text: 'APPLICANT DETAILS',
                    wizard_pnl: 'renewpremisereceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,iconAlign:'top',
                    text: 'DOCUMENT UPLOADS',
                    wizard_pnl: 'renewpremisereceivingwizard',
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    wizard_pnl: 'renewpremisereceivingwizard',
                    text: 'PRE-CHECKING',iconAlign:'top',
                    action: 'quickNav'
                },
                {
                           step: 7,
                           iconCls: 'fa fa-money',
                           enableToggle: true,iconAlign:'top',
                           wizard_pnl: 'renewpremisereceivingwizard',
                           text: 'Invoice & Payment Details',
                           action: 'quickNav'
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
                    },
                    wizard_pnl: 'renewpremisereceivingwizard',
                    name: 'prev_btn'
                },
                {
                    xtype: 'transitionsbtn'
                },
                {
                    xtype: 'applicationdismissalbtn'
                },
                {
                    text: 'Queries/Responses',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-gavel',
                    name: 'queries_responses',
                    hidden: true
                },
                '->',
                {
                    text: 'Save Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1
                },
                {
                    text: 'Save Screening Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    hidden: true
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'foodpremiseregistrationstr',
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
                        disabled: '{atEnd}'
                    },
                    wizard_pnl: 'renewpremisereceivingwizard',
                    name: 'next_btn'
                }
            ]
        };
        me.callParent(arguments);
    }
});
