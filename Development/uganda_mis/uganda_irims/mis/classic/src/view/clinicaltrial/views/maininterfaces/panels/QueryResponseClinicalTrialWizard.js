
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.panels.QueryResponseClinicalTrialWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.queryResponseclinicaltrialwizard',
    viewModel: 'clinicaltrialvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    itemId: 'queryResponseclinicaltrialwizardId',
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
            xtype: 'adhocqueryresponsesgrid',
            autoScroll: true,
            listeners: {
                activate: 'loadAdhocQueryGrid'
            }
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
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: 'CLINICAL TRIAL DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'STUDY SITES',
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-plus-square',
                    enableToggle: true,
                    text: 'OTHER INVESTIGATORS',
                    action: 'quickNav'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-th-large',
                    enableToggle: true,
                    text: 'IMP PRODUCTS',
                    action: 'quickNav'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav'
                },
                {
                    step: 6,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Query Response',
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
                    handler: 'onPrevInspectionCardClickMoreDetails'
                },
                {
                    xtype: 'transitionsbtn'
                },
                '->',
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check',
                    name: 'process_submission_btn',
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
                    handler: 'onNextInspectionCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
