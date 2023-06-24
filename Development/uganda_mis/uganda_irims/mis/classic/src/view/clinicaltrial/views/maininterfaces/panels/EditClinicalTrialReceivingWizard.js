
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.panels.EditClinicalTrialReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.editclinicaltrialreceivingwizard',
    viewModel: 'clinicaltrialvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    itemId: 'editclinicaltrialreceivingwizardId',
    layout: 'card',
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'clinicaltrialapplicantpnl',
            autoScroll: true
        },
        {
            xtype: 'clinicaltrialsdetailspnl',
            autoScroll: true
        },
        {
            xtype: 'clinicaltrialstudysitesgrid',
            autoScroll: true
        },
        {
            xtype: 'clinicaltrialotherinvestigatorsgrid',
            autoScroll: true
        },
        {
            xtype: 'impproductsgrid',
            autoScroll: true
        },
        {
            xtype: 'clinicaltrialdocuploadsgenericgrid',
            autoScroll: true
        },
        {
            xtype: 'producteditvariationrequestsgrid',
            autoScroll: true
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
                    text: 'APPLICANT DETAILS',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: 'CLINICAL TRIAL DETAILS',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'STUDY SITES',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-plus-square',
                    enableToggle: true,
                    text: 'OTHER INVESTIGATORS',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'IMP PRODUCTS',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    action: 'quickNav'
                },
                {
                    step: 6,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Variation Request',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
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
                    name: 'prev_btn',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    handler: 'onPrevInspectionCardClickMoreDetails'
                },
                {
                    xtype: 'transitionsbtn'
                },
                '->',
                {
                    text: 'Update Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    handler: 'saveEditAppBaseDetails',
                    winWidth: '50%',
                    toaster: 0
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    name: 'next_btn',
                    wizard_pnl: 'newclinicaltrialreceivingwizard',
                    max_step: 7,
                    handler: 'onNextInspectionCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
