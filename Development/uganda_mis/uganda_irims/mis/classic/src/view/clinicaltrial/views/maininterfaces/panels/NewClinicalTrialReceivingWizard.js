/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.panels.NewClinicalTrialReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newclinicaltrialreceivingwizard',
    viewModel: 'clinicaltrialvm',
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
            xtype: 'clinicaltrialapplicantpnl'
        },
        {
            xtype: 'clinicaltrialsdetailspnl'
        },
        {
            xtype: 'clinicaltrialstudysitesgrid'
        },
        {
            xtype: 'clinicaltrialotherinvestigatorsgrid'
        },
        {
            xtype: 'impproductsgrid'
        },
        {
            xtype: 'clinicaltrialdocuploadsgenericgrid'
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
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,iconAlign:'top',
                    text: 'APPLICANT DETAILS',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,iconAlign:'top',
                    text: 'CLINICAL TRIAL DETAILS',wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,iconAlign:'top',
                    text: 'STUDY SITES',wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-plus-square',
                    enableToggle: true,iconAlign:'top',
                    text: 'OTHER INVESTIGATORS',wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,iconAlign:'top',
                    text: 'IMP PRODUCTS',wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,iconAlign:'top',
                    text: 'DOCUMENT UPLOADS',wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 6,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,iconAlign:'top',
                    text: 'PRE-CHECKING',wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                           step: 7,
                           iconCls: 'fa fa-money',
                           enableToggle: true,iconAlign:'top',
                           text: 'Invoice & Payment Details',wizard_pnl: 'newclinicaltrialreceivingwizard',
                           max_step: 7,
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
                    },wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    name: 'prev_btn'
                },
                {
                    xtype: 'transitionsbtn'
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
                    text: 'Save Clinical Trial Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_clinicaltrial_details_btn',
                    hidden: true,
                    toaster: 1
                },
                {
                    text: 'Save Other Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_other_details_btn',
                    hidden: true,
                    toaster: 1
                },
               {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    name: 'next_btn'
                },{
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check', hidden: true,
                    name: 'process_submission_btn',
                    storeID: 'clinicaltrialstr',
                    table_name: 'tra_clinical_trial_applications',
                    winWidth: '50%',
                    toaster: 0
                }
            ]
        };
        me.callParent(arguments);
    }
});
