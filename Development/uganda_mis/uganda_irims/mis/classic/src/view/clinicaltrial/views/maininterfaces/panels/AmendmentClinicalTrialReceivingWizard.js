/**
 * Created by Kip on 1/31/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.panels.AmendmentClinicalTrialReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.amendmentclinicaltrialreceivingwizard',
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
            xtype: 'clinicaltrialamendmentapplicantpnl'
        },
        {
            xtype: 'clinicaltrialsdetailspnl'
        },
        
        {
            xtype: 'clinicaltrialdocuploadsgenericgrid'
        },
        {
            xtype: 'productvariationrequestsgrid'
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
                    enableToggle: true,iconAlign:'top',
                    pressed: true, wizard_pnl: 'amendmentclinicaltrialreceivingwizard',
                    max_step: 4,
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,iconAlign:'top', wizard_pnl: 'amendmentclinicaltrialreceivingwizard',
                    max_step: 4,
                    text: 'CLINICAL TRIAL DETAILS',
                    action: 'quickNav'
                },
                
                {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,iconAlign:'top',
                    text: 'DOCUMENT UPLOADS', wizard_pnl: 'amendmentclinicaltrialreceivingwizard',
                    max_step: 4,
                    action: 'quickNav'
                },
                
                {
                    step: 3,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Variation Request',iconAlign:'top',
                    wizard_pnl: 'amendmentclinicaltrialreceivingwizard',
                    max_step: 4,
                    action: 'quickNav'
                },
                {
                           step: 4,
                           iconCls: 'fa fa-money',
                           enableToggle: true,iconAlign:'top', wizard_pnl: 'amendmentclinicaltrialreceivingwizard',
                           max_step: 4,
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
                    }, wizard_pnl: 'amendmentclinicaltrialreceivingwizard',
                    max_step: 4,
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
                    text: 'Save Applicant Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1
                },
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
                    }, wizard_pnl: 'amendmentclinicaltrialreceivingwizard',
                    max_step: 4,
                    name: 'next_btn'
                },
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
                    storeID: 'foodpremiseregistrationstr',
                    table_name: 'tra_gmp_applications',
                    winWidth: '50%',
                    toaster: 0
                }
            ]
        };
        me.callParent(arguments);
    }
});
