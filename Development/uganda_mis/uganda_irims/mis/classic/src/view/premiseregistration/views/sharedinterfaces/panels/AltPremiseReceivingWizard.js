/**
 * Created by Kip on 12/7/2018.
 */
Ext.define('Admin.view.premiseregistration.views.sharedinterfaces.panels.AltPremiseReceivingWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.altpremisereceivingwizard',
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
        /*{
            xtype: 'alterationamendmentspnl'
        },*/
        {
            xtype: 'applicationpremisepnl'
        },
        {
            xtype: 'applicantdetailsfrm'
        },
        {
            xtype: 'premisevariationrequestsgrid'
        },
        {
            xtype: 'premregappdocuploadsgenericgrid'
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
                /*{
                    step: 0,
                    iconCls: 'fa fa-check-square',
                    pressed: true,
                    enableToggle: true,
                    text: 'AMENDMENT REQUEST',
                    action: 'quickNav'
                },*/
                {
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    pressed: true,
                    text: 'PREMISE DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'AMENDMENT/VARIATION REQUEST',
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
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
                    name: 'next_btn'
                }
            ]
        };
        me.callParent(arguments);
    }
});
